import { useEffect } from "react";
import { api } from "../api/api";
import useAuth from "./useAuth";
import authenticationService from "../api/authenticationService";

function useSecureApi() {
  const { accessToken, setAccessToken } = useAuth();
  const { refreshToken } = authenticationService();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log("REFRESH");
          prevRequest.sent = true;
          const newAuthState = await refreshToken();
          const newToken = newAuthState.token;
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          setAccessToken(newToken);
          return api(prevRequest);
        }
        Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return api;
}

export default useSecureApi;

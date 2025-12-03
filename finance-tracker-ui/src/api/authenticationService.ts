import type { AuthenticationResponse, LoginCredentials } from "../types/auth";
import { api } from "./api";

function authenticationService() {
  const login = async (
    LoginCredentials: LoginCredentials
  ): Promise<AuthenticationResponse> => {
    const { data } = await api.post<AuthenticationResponse>(
      "/auth/authenticate",
      LoginCredentials
    );
    return data;
  };

  const refreshToken = async (): Promise<AuthenticationResponse> => {
    const { data } = await api.post<AuthenticationResponse>(
      "/auth/refresh-token"
    );
    return data;
  };
  return { login, refreshToken };
}

export default authenticationService;

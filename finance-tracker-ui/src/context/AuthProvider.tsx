import { createContext, useMemo, useState } from "react";
import type { LoginCredentials, Role } from "../types/auth";
import authenticationService from "../api/authenticationService";
import { useNavigate } from "react-router";

type ProviderProps = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  username: string | null;
  userId: number | null;
  roles: Role[] | null;
  login(data: LoginCredentials): void;
  logout(): void;
};

const AuthContext = createContext<ProviderProps>({
  accessToken: null,
  setAccessToken: () => null,
  username: null,
  userId: null,
  roles: [],
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [roles, setRoles] = useState<Role[] | null>(null);
  const { login: authenticate } = authenticationService();
  const navigate = useNavigate();

  const login = async (loginData: LoginCredentials) => {
    try {
      const authResponse = await authenticate(loginData);
      setAccessToken(authResponse.token);
      setUserId(authResponse.userId);
      setUsername(authResponse.username);
      setRoles(authResponse.roles);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRoles(null);
  };

  const contextValues = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      username,
      userId,
      roles,
      login,
      logout,
    }),
    [accessToken, username, userId, roles]
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

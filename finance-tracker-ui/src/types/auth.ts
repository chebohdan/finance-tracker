export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthenticationResponse = {
  token: string;
  username: string;
  userId: number;
  roles: Role[];
};

export type Role = "ADMIN" | "USER";

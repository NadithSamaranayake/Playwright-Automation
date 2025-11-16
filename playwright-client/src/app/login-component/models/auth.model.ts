export interface LoginCredentials{
  organization?: string;
  userNameorEmail: string;
  password: string;
}

export interface SignUpCredentials{
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  organization?: string;
}
export type LoginFormType = {
  email: string;
  password: string;
}

export type LoginType = {
  loader: boolean;
  form: LoginFormType;
  error: string|null;
}
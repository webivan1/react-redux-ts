export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  verifyCode: string;
}

export type RegisterType = {
  form: RegisterFormType;
  error: null|string;
  loader: boolean;
}


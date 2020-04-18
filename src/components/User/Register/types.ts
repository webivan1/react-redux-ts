import { RegisterFormType } from "../../../store/user/register/types";

// Form components
import { FormRegisterUser } from "./FormRegisterUser";
import { VerifyEmailForm } from "./VerifyEmailForm";

export type FormsType = {
  'FormRegisterUser': typeof FormRegisterUser;
  'VerifyEmailForm': typeof VerifyEmailForm;
}

export type PropTypes = {
  onSetStep: (step: keyof FormsType) => void;
  onRegister: (form: RegisterFormType) => void;
  onVerified: (form: RegisterFormType) => void;
  onClose: () => void;
  formData: RegisterFormType;
  error: null|string;
  loader: boolean;
}
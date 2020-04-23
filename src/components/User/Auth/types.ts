import { ReactNode, FC } from "react";

export enum ListComponents {
  'register' = 'register',
  'login' = 'login'
}

export type ListComponentsType = keyof typeof ListComponents

export type PropFormTypes = {
  onClose: () => void;
  onChangeForm: (formName: ListComponentsType) => void;
}

export type ConfigType = {
  [index in ListComponentsType]: {
    component: FC<PropFormTypes>;
    title: string;
  }
}
import React, { FC, useState } from "react";
import { Modal } from "react-bootstrap";

// Config
import { config } from "./config";

// Types
import { ListComponentsType, ListComponents } from "./types";

type PropTypes = {
  isShow: boolean;
  onHide: () => void;
}

export const Auth: FC<PropTypes> = ({ isShow, onHide }: PropTypes) => {
  const [formName, setFormName] = useState<ListComponentsType>(ListComponents.login);

  const handleChangeForm = (form: ListComponentsType) => setFormName(form);

  const { component, title } = config[formName];
  const FormComponent = component;

  return (
    <Modal show={isShow} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormComponent
          onClose={onHide}
          onChangeForm={handleChangeForm}
        />
      </Modal.Body>
    </Modal>
  )
};
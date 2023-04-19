import React, { useState } from "react";

import { createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    address: "",
    sector: "",
    cep: "",
    email: "",
    phone: "",
  });

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, formData, setFormData }}>
      {children}
    </ModalContext.Provider>
  );
};

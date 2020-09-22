import React from "react";

import { button } from "./MenuButton.module.scss";

const Button = ({ children, onClick }) => {
  return (
    <div className={button} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;

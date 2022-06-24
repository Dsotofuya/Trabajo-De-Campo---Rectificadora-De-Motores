import React from "react";
import { ButtonContainer, IconContainer } from "../styles/style-components";

const Button = ({ size, theme, icon, text, onClick }) => {
  return (
    <ButtonContainer size={size} theme={theme} onClick={onClick}>
      {icon ? <IconContainer>{icon}</IconContainer> : null}
      <span>{text}</span>
    </ButtonContainer>
  );
};

export default Button;
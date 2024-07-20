'use client'

import styled, { css, ExecutionContext } from "styled-components";  
import { primary, primary_dark } from "../../../../lib/colors";

type ButtonProps = {
  $full?: boolean;
  $default?: boolean;
  $md?: boolean;
  $white?: boolean;
  $outline?: boolean;
};

export const ButtonStyle = css<ButtonProps>`
  border-radius: 10px;
  font-weight: 500;
  padding: 14px 20px;
  transition: all .2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  svg { 
    width: 14px;
    height: 14px;
    transform: scale(1.6);
  }

  &:active {
    transform: scale(0.70);
  }

  ${(props) => props.$full && `
    width: 100%;
  `}

  ${(props) => props.$default && `
    background-color: ${primary}; 
    border: 2px solid ${primary}; 
    color: white;

    &:hover {
      background: ${primary_dark};  
      border: 2px solid ${primary_dark}; 
    }
  `}

  ${(props) => props.$md && ` 
    padding: 10px 12px; 
  `}

  ${(props) => props.$white && !props.$outline && `
    background-color: white; 
    color: ${primary};
    border: 2px solid white; 
  `}

  ${(props) => props.$outline && !props.$white && `
    border: 2px solid ${primary};
    color: ${primary};

    &:hover {
      background: ${primary};  
      color: white;
    }
  `}

  ${(props) => props.$outline && props.$white && `
    border: 2px solid white; 
    color: white;

    &:hover {
      background: white;   
      color: ${primary};
    }
  `}
`;

const StyledButton = styled.button<ButtonProps>`
  ${ButtonStyle}
`;

const Button = ({ children, onClick, className, ...rest }: any) => {
  return (
    <StyledButton onClick={onClick} {...rest} className={className}>
      {children}
    </StyledButton>
  );
}

export default Button;

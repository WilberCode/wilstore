import styled from "styled-components"
import { ButtonStyle } from "./Button";
import Link from "next/link";

 

 const StyledLink = styled(Link)<{ $white?: boolean; $outline?: boolean;$default?: boolean; $full: boolean;}>`${ButtonStyle}` 

const ButtonLink = ({children,...rest}:any) => {
  return (
    <StyledLink {...rest} >{children}</StyledLink>
  )
}

export default ButtonLink
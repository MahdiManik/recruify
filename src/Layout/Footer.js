import React from "react";
import styled from "styled-components";

const FooterStyled = styled.footer`
  padding: 20px;
  text-align: center;
  background-color: #f4f4f4;
  font-size: 14px;
  color: #555;
`;

export default function Footer() {
  return (
    <div>
      <FooterStyled>© 2025 Design Scheduler. All rights reserved.</FooterStyled>
    </div>
  );
}

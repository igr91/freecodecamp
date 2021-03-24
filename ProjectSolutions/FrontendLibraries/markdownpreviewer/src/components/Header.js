import React from "react";
import styled from "styled-components";

// Styled Components
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  background-color: #52b788;
  border-bottom: 4px solid #081c15;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.3);
`;

// React
const Header = () => {
  return (
    <StyledHeader>
      <h1>Markdown Editor</h1>
    </StyledHeader>
  );
};

export default Header;

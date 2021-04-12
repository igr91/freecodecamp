import React from "react";
import styled from "styled-components";

//React

const Display = (props) => {
  return (
    <DisplayContainer>
      <DisplayText id="display">{props.currentId}</DisplayText>
    </DisplayContainer>
  );
};

export default Display;

//StyledComponents

const DisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #801336;
  border: 4px solid #801336;
  border-radius: 10px;
  width: 300px;
  margin: 0.5rem;
  box-shadow: 1px 1px 1px #000000;
`;
const DisplayText = styled.h2`
  color: #ffffff;
`;

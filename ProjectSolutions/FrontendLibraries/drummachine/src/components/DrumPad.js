import React, { Component } from "react";
import styled from "styled-components";

//React

class DrumPad extends Component {
  render() {
    return (
      <DrumPadButton
        className="drum-pad"
        onClick={() => this.props.onClickHandler(this.props.bankInUse.id)}
        id={this.props.bankInUse.id}
      >
        <DrumPadText>{this.props.bankInUse.keyTrigger}</DrumPadText>

        <audio
          className="clip"
          src={this.props.bankInUse.url}
          id={this.props.bankInUse.keyTrigger}
        />
      </DrumPadButton>
    );
  }
}

export default DrumPad;

//StyledComponents

const DrumPadButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #c72c41;
  border-radius: 10px;
  background-color: #c72c41;
  width: 80px;
  height: 80px;
  margin: 0;
  padding: 0;
  box-shadow: 1px 1px 1px #000000;
  &:active,
  &.keydownActive {
    background-color: #bd8180;
    border: 4px solid #bd8180;
    outline:none;
  }
  
`;

const DrumPadText = styled.h2`
  color: #000000;
`;

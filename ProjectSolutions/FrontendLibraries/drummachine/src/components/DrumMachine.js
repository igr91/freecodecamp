import React, { Component } from "react";
import styled from "styled-components";
import DrumPad from "./DrumPad";
import Display from "./Display";

//React

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

class DrumMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankInUse: [],
      currentId: "",
      volume: 0
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.playSound = this.playSound.bind(this);
    this.bankSwitch = this.bankSwitch.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
  }

  componentDidMount() {
    this.setState({
      bankInUse: bankOne,
      currentId: "Ready - Heater Kit",
      volume: 1
    });
    document.addEventListener("keydown", this.keyDownHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownHandler);
  }

  bankSwitch() {
    if (this.state.bankInUse === bankOne) {
      this.setState({
        bankInUse: bankTwo,
        currentId: "Smooth Piano Kit"
      });
    } else {
      this.setState({
        bankInUse: bankOne,
        currentId: "Heater Kit"
      });
    }
  }

  updateVolume(e) {
    const volume = e.target.value;
    this.setState({
      volume: volume,
      currentId: `Volume: ${Math.floor(volume * 100)}%`
    });
  }

  onClickHandler(DrumPadButtonID) {
    const { keyTrigger, id } = {...this.state.bankInUse.find((item) => item.id === DrumPadButtonID),};
    this.setState({ currentId: id }, () => this.playSound(keyTrigger));
  }

  keyDownHandler(e) {
    const { keyTrigger, id } = {...this.state.bankInUse.find((item) => item.keyCode === e.keyCode),};
    if (keyTrigger && id) {
      this.setState({ currentId: id }, () => this.playSound(keyTrigger));
    }
  }

  playSound(inputElement) {
    const drumPadSound = document.getElementById(inputElement);
    drumPadSound.volume = this.state.volume;
    drumPadSound.currentTime = 0;
    drumPadSound.play();
    drumPadSound.parentNode.classList.add('keydownActive');
    drumPadSound.onended = () => {drumPadSound.parentNode.classList.remove('keydownActive')};;
  }

  render() {
    const drumPads = this.state.bankInUse.map((item, i) => (
      <DrumPad
        bankInUse={this.state.bankInUse[i]}
        key={i}
        onClickHandler={this.onClickHandler}
      ></DrumPad>
    ));

    return (
      <>
        <DrumMachineHeader>Drum Machine</DrumMachineHeader>

        <DrumMachineContainer id="drum-machine">
          <ControlsContainer>
            <ControlButton onClick={this.bankSwitch}>
              <ControlButtonText>Bank</ControlButtonText>
            </ControlButton>

            <VolumeRange
              type={"range"}
              min={0}
              max={1}
              step={0.01}
              onChange={this.updateVolume}
            ></VolumeRange>
          </ControlsContainer>

          <Display currentId={this.state.currentId}></Display>

          <DrumPadsContainer>{drumPads}</DrumPadsContainer>
        </DrumMachineContainer>
      </>
    );
  }
}

export default DrumMachine;

//StyledComponents

const DrumMachineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;
  background-color: #2d142c;
  border: 4px solid #2d142c;
  border-radius: 10px;
`;

const DrumPadsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row wrap;
  width: 300px;
  height: 300px;
  margin: 0.5rem;
  background-color: #510a32;
  border: 4px solid #510a32;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #000000
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row nowrap;
  width: 285px;
  height: fit-content;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: #510a32;
  border: 4px solid #510a32;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #000000;
`;

const DrumMachineHeader = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  font-size: 2.5em;
  color: #000000;
`;

const ControlButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #c72c41;
  border-radius: 10px;
  background-color: #c72c41;
  width: fit-content;
  height: 40px;
  box-shadow: 1px 1px 1px #000000;
  &:active{
    background-color: #BD8180;
    border: 4px solid #BD8180;
    outline: none;
  }
`;

const ControlButtonText = styled.h4`
  color: #000000;
`;

const VolumeRange = styled.input`
  appearance: none;
  width: 50%;
  background: #801336; 
  height: 15px;
  opacity: 1;

  &:focus{
    outline: none;
  }

  &::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #000000;
  height: 30px;
  width: 15px;
  border-radius: 5px;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000;
}

&::-moz-range-thumb {
  border: 1px solid #000000;
  height: 30px;
  width: 15px;
  border-radius: 5px;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000;
}
`;

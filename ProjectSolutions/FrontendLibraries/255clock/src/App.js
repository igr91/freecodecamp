// references:
// https://reactjs.org/docs/hooks-reference.html
// https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
// https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks

import React, { useState, useEffect, useRef } from "react";

const POMODORO = {
  OPERATION_INCREASE: "+",
  OPERATION_DECREASE: "-",
  SESSION_STATE: "Session",
  BREAK_STATE: "Break",
  SESSION_LENGTH: 25,
  BREAK_LENGTH: 5,
};

const secondsToMMSS = (inputSeconds) => {
  const mins = Math.floor(inputSeconds / 60);
  const secs = inputSeconds % 60;
  const formattedMins = mins < 10 ? "0" + mins : mins;
  const formattedSecs = secs < 10 ? "0" + secs : secs;
  return `${formattedMins}:${formattedSecs}`;
};

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [sessionLength, setSessionLength] = useState(POMODORO.SESSION_LENGTH);
  const [breakLength, setBreakLength] = useState(POMODORO.BREAK_LENGTH);
  const [pomodoroState, setPomodoroState] = useState(POMODORO.SESSION_STATE);
  const [pomodoroTimer, setPomodoroTimer] = useState(secondsToMMSS(POMODORO.SESSION_LENGTH * 60));
  const beepSoundRef = useRef();

  //handle timer setup when not active
  useEffect(() => {
    if (isActive === false) {
      setPomodoroTimer(secondsToMMSS(sessionLength * 60));
    }
  }, [isActive, sessionLength]);

  //handle countdown
  useEffect(() => {
    if (isActive === true && isPaused === false) {
      setPomodoroTimer(secondsToMMSS(secondsLeft));

      const pomodoroInterval = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
        if (secondsLeft === 0) {
          beepSoundRef.current.play();
          if (isSession) {
            setIsSession(false);
            setSecondsLeft(breakLength * 60);
            setPomodoroState(POMODORO.BREAK_STATE);
          } else {
            setIsSession(true);
            setSecondsLeft(sessionLength * 60);
            setPomodoroState(POMODORO.SESSION_STATE);
          }
        }
      }, 1000);

      return () => clearInterval(pomodoroInterval);
    }
  }, [isActive, isPaused, isSession, secondsLeft, breakLength, sessionLength]);

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setIsSession(true);
    setSecondsLeft(0);
    setSessionLength(POMODORO.SESSION_LENGTH);
    setBreakLength(POMODORO.BREAK_LENGTH);
    setPomodoroState(POMODORO.SESSION_STATE);
    setPomodoroTimer(secondsToMMSS(POMODORO.SESSION_LENGTH * 60));
    beepSoundRef.current.pause();
    beepSoundRef.current.currentTime = 0;
  };

  const handleSessionLength = (operation) => {
    operation === POMODORO.OPERATION_INCREASE
      ? setSessionLength(Math.min(sessionLength + 1, 60))
      : setSessionLength(Math.max(sessionLength - 1, 1));
  };

  const handleBreakLength = (operation) => {
    operation === POMODORO.OPERATION_INCREASE
      ? setBreakLength(Math.min(breakLength + 1, 60))
      : setBreakLength(Math.max(breakLength - 1, 1));
  };

  const handleStatusToggle = () => {
    isActive === true && isPaused === false
      ? setIsPaused(true)
      : setIsPaused(false);

    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
      setSecondsLeft(sessionLength * 60);
    }
  };

  return (
    <main className="flex-column general-container">
      <h1 className="general-title">Pomodoro clock</h1>

      <div className="flex-row">
        <div className="flex-column">
          <h1 id="session-label">Session Length</h1>
          <div className="flex-row">
            <button id="session-decrement" onClick={() => handleSessionLength(POMODORO.OPERATION_DECREASE)}>
              -
            </button>
            <h1 id="session-length">{sessionLength}</h1>
            <button id="session-increment" onClick={() => handleSessionLength(POMODORO.OPERATION_INCREASE)}>
              +
            </button>
          </div>
        </div>

        <div className="flex-column">
          <h1 id="break-label">Break Length</h1>
          <div className="flex-row">
            <button type="buttton" id="break-decrement" onClick={() => handleBreakLength(POMODORO.OPERATION_DECREASE)}>
              -
            </button>
            <h1 id="break-length">{breakLength}</h1>
            <button type="buttton" id="break-increment" onClick={() => handleBreakLength(POMODORO.OPERATION_INCREASE)}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex-column">
        <div  className="flex-column">
          <h1 id="timer-label">{pomodoroState}</h1>
          <h1 id="time-left">{pomodoroTimer}</h1>
        </div>

        <div className="flex-row">
          <button type="buttton" id="start_stop" onClick={() => handleStatusToggle()}>
            {isActive === true && isPaused === false ? "Stop" : "Start"}
          </button>
          <button type="buttton" id="reset" onClick={() => handleReset()}>
            Reset
          </button>
        </div>
      </div>

      <audio
        id="beep"
        preload="auto"
        ref={beepSoundRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </main>
  );
};

export default App;

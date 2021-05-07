import React, { useReducer } from "react";
import { evaluate } from "mathjs";

const initialState = {
  numberDisplay: "0",
  formulaDisplay: "",
  lastInput: "",
};

const ACTIONS = {
  CLEAR: "clear",
  OPERATION: "operation",
  NUMBER: "number",
  EVALUATE: "evaluate",
};

const REGEX = {
  OPS: /[/*\-+]/g,
};

function calculatorReducer(state, action) {
  const cState = { ...state };
  const cKey = action.payload.key;

  switch (action.type) {
    case ACTIONS.CLEAR:
      return {
        ...state,
        numberDisplay: "0",
        formulaDisplay: "",
        lastInput: cKey,
      };

    case ACTIONS.OPERATION:
      let opsFD = cState.formulaDisplay;
      let opsND = cState.numberDisplay;
      const FDLastTwo = opsFD.slice(-2).match(REGEX.OPS);

      // continue calculation from last result
      if (opsFD.includes("=")) {
        opsFD = opsND;
        opsND = "";
      }

      // add current ND to current FD, then replace ND with current pressed Key
      opsFD += opsND;
      opsND = cKey;

      // check for the last two characters of FD then match with an operations regex,
      // if not null/undefined and last input was an operator,
      // then replace these with the third pressed operator cKey
      if (
        FDLastTwo !== null &&
        FDLastTwo !== undefined &&
        cState.lastInput.match(REGEX.OPS)
      ) {
        opsFD = opsFD.slice(0, -2) + cKey;
        opsND = cKey;
      }

      return {
        ...state,
        numberDisplay: opsND,
        formulaDisplay: opsFD,
        lastInput: cKey,
      };

    case ACTIONS.DECIMAL:
      let decimalND = cState.numberDisplay + cKey;

      // if we already have a decimal, do nothing
      if (cState.numberDisplay.includes(".")) {
        decimalND = cState.numberDisplay;
      }

      return {
        ...state,
        numberDisplay: decimalND,
        lastInput: cKey,
      };

    case ACTIONS.NUMBER:
      let numberND = cState.numberDisplay + cKey;
      const firstDigit = numberND.slice(0, 1);

      // is there a leading zero and only one at that? discard further presses
      if (firstDigit === "0" && cState.numberDisplay.length === 1) {
        numberND = cKey;
      }

      return {
        ...state,
        numberDisplay: numberND,
        lastInput: cKey,
      };

    case ACTIONS.EVALUATE:
      let formula = cState.formulaDisplay + cState.numberDisplay;

      try {
        const result = evaluate(formula);
        const finalFD = formula + "=" + result;
        return {
          ...state,
          numberDisplay: result,
          formulaDisplay: finalFD,
          lastInput: cKey,
        };
      } catch (error) {
        return {
          ...state,
          numberDisplay: "0",
          formulaDisplay: "",
          lastInput: "AC",
        };
      }

    default:
      return state;
  }
}

function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const calculatorItems = [
    {
      divClass: "grid-display",
      id: "display",
    },
    {
      divClass: "grid-clear",
      id: "clear",
      label: "AC",
      action: ACTIONS.CLEAR,
    },
    {
      divClass: "grid-divide",
      id: "divide",
      label: "/",
      action: ACTIONS.OPERATION,
    },
    {
      divClass: "grid-multiply",
      id: "multiply",
      label: "*",
      action: ACTIONS.OPERATION,
    },
    {
      divClass: "grid-subtract",
      id: "subtract",
      label: "-",
      action: ACTIONS.OPERATION,
    },
    {
      divClass: "grid-add",
      id: "add",
      label: "+",
      action: ACTIONS.OPERATION,
    },
    {
      divClass: "grid-equals",
      id: "equals",
      label: "=",
      action: ACTIONS.EVALUATE,
    },
    {
      divClass: "grid-decimal",
      id: "decimal",
      label: ".",
      action: ACTIONS.DECIMAL,
    },
    {
      divClass: "grid-zero",
      id: "zero",
      label: "0",
      action: ACTIONS.NUMBER,
    },
    {
      divClass: "grid-one",
      id: "one",
      label: "1",
      action: ACTIONS.NUMBER,
    },
    {
      divClass: "grid-two",
      id: "two",
      label: "2",
      action: ACTIONS.NUMBER,
    },
    {
      divClass: "grid-three",
      id: "three",
      label: "3",
      action: ACTIONS.NUMBER,
    },
    {
      divClass: "grid-four",
      id: "four",
      label: "4",
      action: ACTIONS.NUMBER,
    },
    {
      divClass: "grid-five",
      id: "five",
      label: "5",
      action: ACTIONS.NUMBER,
    },
    {
      divClass: "grid-six",
      id: "six",
      label: "6",
      action: ACTIONS.NUMBER,
    },
    {
      divClass: "grid-seven",
      id: "seven",
      label: "7",
      action: ACTIONS.NUMBER,
    },
    {
      divClass: "grid-eight",
      id: "eight",
      label: "8",
      action: ACTIONS.NUMBER,
    },
    {
      divClass: "grid-nine",
      id: "nine",
      label: "9",
      action: ACTIONS.NUMBER,
    },
  ];

  return (
    <div className={"grid-container"}>
      {calculatorItems //display
        .filter((item) => item.divClass === "grid-display")
        .map((item) => (
          <div className={item.divClass} key={item.id}>
            <h4 id="secondary-display">{state.formulaDisplay}</h4>
            <h1 id={item.id}>{state.numberDisplay}</h1>
          </div>
        ))}

      {calculatorItems //buttons
        .filter((item) => item.divClass !== "grid-display")
        .map((item) => (
          <div className={item.divClass} key={item.id}>
            <button
              id={item.id}
              type={"button"}
              value={item.label}
              onClick={() =>
                dispatch({ type: item.action, payload: { key: item.label } })
              }
            >
              <h3>{item.label}</h3>
            </button>
          </div>
        ))}
    </div>
  );
}

export default Calculator;

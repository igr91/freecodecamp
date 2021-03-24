import React from "react";
import ReactDOM from "react-dom";
import MarkdownPreviewer from "./components/MarkdownPreviewer";

//border-box everything, global fonts
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body{
    margin: 0;
    font-family: 'Archivo', sans-serif;
    background-color:#b7e4c7;
  }
`;

//React
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <MarkdownPreviewer />
  </React.StrictMode>,
  document.getElementById("root")
);

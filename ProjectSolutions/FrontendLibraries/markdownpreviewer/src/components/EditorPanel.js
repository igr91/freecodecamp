import React from "react";
import styled from "styled-components";

// Styled Components
const StyledEditorPanel = styled.div`
  background-color: #d8f3dc;
  width: 48vw;
  height: 85vh;
  border: 2px solid #000000;
  position: relative;

  #editor-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    background-color: #52b788;
    border-bottom: 2px solid #000000;
  }

  #textarea-container {
    height: 100%;
    width: 100%;
    
    textarea {
      width: 100%;
      height: calc(100% - 3rem);
      border: none;
      overflow: auto;
      outline: none;
      resize: none;
      font-size: 1.33em;
      padding: 0.5rem;
    }
  }
`;

//React
const EditorPanel = (props) => {
  return (
    <StyledEditorPanel id="editor-panel">
      <div id="editor-title">
          <h2>Editor</h2>
        </div>

        <div id="textarea-container">
          <textarea
            id="editor"
            placeholder="Enter your markdown here"
            value={props.markdown}
            onChange={props.onChange}
          ></textarea>
        </div>     
    </StyledEditorPanel>
  );
};

export default EditorPanel;

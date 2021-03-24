import React from "react";
import styled from "styled-components";
import marked from "marked";

// Styled Components
const StyledPreviewPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background-color: #d8f3dc;
  width: 48vw;
  height: 85vh;
  background-color: #ffffff;
  border: 2px solid #000000;

  #preview-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    background-color: #52b788;
    border-bottom: 2px solid #000000;
  }

  #preview {
    background-color: #ffffff;
    padding: 0.5rem;
    height: (85vh - 3rem);
    overflow-x: hidden;
    overflow-y: auto;

    /* Markdown CSS rules from: */
    /* // https://codepen.io/freeCodeCamp/pen/GrZVVO */
    blockquote {
      border-left: 3px solid #224b4b;
      color: #224b4b;
      padding-left: 5px;
      margin-left: 25px;
    }

    code {
      background: white;
      padding: 1px 4px 2px 4px;
      font-size: 16px;
      font-weight: bold;
    }

    pre {
      background: white;
      padding: 5px 0 5px 5px;
    }

    h1 {
      border-bottom: 2px solid #000000;
    }

    h2 {
      border-bottom: 1px solid #000000;
    }

    table {
      border-collapse: collapse;
    }

    td,
    th {
      border: 2px solid #000000;
      padding-left: 5px;
      padding-right: 5px;
    }
  }
`;

//React
const markedRenderer = new marked.Renderer();
const PreviewPanel = (props) => {
  return (
    <StyledPreviewPanel id="preview-panel">
      <div id="preview-title">
        <h2>Preview</h2>
      </div>

      <div
        id="preview"
        dangerouslySetInnerHTML={{
          __html: marked(props.sanitizedOutput, { renderer: markedRenderer }),
        }}
      />
    </StyledPreviewPanel>
  );
};

export default PreviewPanel;

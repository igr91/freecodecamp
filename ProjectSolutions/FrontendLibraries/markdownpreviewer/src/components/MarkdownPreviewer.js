import React from "react";
import marked from "marked";
import dompurify from "dompurify";
import Header from "./Header.js";
import EditorPanel from "./EditorPanel.js";
import PreviewPanel from "./PreviewPanel.js";
import styled from "styled-components";

// Styled Components
const StyledMain = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-flow: row wrap;
  margin-top: 1.5rem;
`;

//React
class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholderMarkdown,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      markdown: event.target.value,
    });
  }

  render() {
    let markedOutput = marked(this.state.markdown);
    let sanitizedMarkedOutput = dompurify.sanitize(markedOutput);

    return (
      <div id="containerdiv">
        <Header />

        <StyledMain>
          <EditorPanel
            markdown={this.state.markdown}
            onChange={this.handleChange}
          />

          <PreviewPanel sanitizedOutput={sanitizedMarkedOutput} />
        </StyledMain>
      </div>
    );
  }
}

const placeholderMarkdown = `# Hi! I'm igr91, welcome!

## This is my first try at a React app, a responsive Markdown previewer and editor
### Technologies used:

* HTML5
* CSS3 (styled-components)
* JavaScript
* React (used create-react-app)
* Marked
* DOMpurify

There is one stateful ES6 class component (\`MarkdownPreviewer\`) and three presentational components (\`EditorPanel\`, \`PreviewPanel\`, \`Header\`), all SFCs.  

\`State\` and \`marked\`'s sanitized output is passed as props from \`MarkdownPreviewer\` to \`EditorPanel\` and \`PreviewPanel\`. \`Header\` is just more practice.

It looks something like this:

    <MarkdownPreviewer />
      |- <Header />
      |- <EditorPanel />
      |- <PreviewPanel />
    
\`MarkdownPreviewer\` is then rendered.

This was developed using \`create-react-app\` in vscode, each component in its own file and then exported/imported as required.

---

**This was quite the learning experience!**
Here are my [Github](https://github.com/igr91) and my [freeCodeCamp](https://www.freecodecamp.org/igr91) profiles.

> Here's the React logo:
![React Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/320px-React-icon.svg.png)
`;

marked.setOptions({
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

export default MarkdownPreviewer;

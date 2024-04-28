import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeDisplay = ({ code, language }) => {
  const customStyle = {
    lineHeight: "1",
    fontSize: "1rem",
    borderRadius: "5px",
    backgroundColor: "#f7f7f7",
    margin: "15px auto",
    width: "92%",
  };
  return (
    <SyntaxHighlighter
      language={language}
      style={solarizedlight}
      customStyle={customStyle}
      showLineNumbers
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeDisplay;

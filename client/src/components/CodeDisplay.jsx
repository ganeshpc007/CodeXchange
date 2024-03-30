import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Import a code highlighting theme

const CodeDisplay = ({ code, language }) => {
  useEffect(() => {
    hljs.highlightAll(); // Apply syntax highlighting on component mount
  }, []);

  return (
    <pre style={{ margin: 0 }}>
      <code
        style={{
          background: "black",
          color: "white",
          width: "625px",
          fontSize: "14px",
          overflowX: "scroll",
        }}
        className={`language-${language}`}
        dangerouslySetInnerHTML={{
          __html: hljs.highlight(code, { language }).value,
        }}
      />
    </pre>
  );
};

export default CodeDisplay;

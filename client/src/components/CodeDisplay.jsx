import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Import a code highlighting theme

const CodeDisplay = ({ code, language }) => {
  useEffect(() => {
    hljs.highlightAll(); // Apply syntax highlighting on component mount
  }, []);

  return (
    <pre>
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{
          __html: hljs.highlight(code, { language }).value,
        }}
      />
    </pre>
  );
};

export default CodeDisplay;

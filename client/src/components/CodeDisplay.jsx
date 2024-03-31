// import React, { useEffect } from "react";
// import hljs from "highlight.js";
// import "highlight.js/styles/github.css"; // Import a code highlighting theme

// const CodeDisplay = ({ code, language }) => {
//   useEffect(() => {
//     hljs.highlightAll(); // Apply syntax highlighting on component mount
//   }, []);

//   return (
//     <pre style={{ margin: 0 }}>
//       <code
//         style={{
//           background: "black",
//           color: "white",
//           width: "625px",
//           fontSize: "14px",
//           overflowX: "scroll",
//         }}
//         className={`language-${language}`}
//         dangerouslySetInnerHTML={{
//           __html: hljs.highlight(code, { language }).value,
//         }}
//       />
//     </pre>
//   );
// };

// export default CodeDisplay;

// import Editor from "@monaco-editor/react";
// const CodeDisplay = ({ code, language }) => {
//   return (
//     <Editor
//       height={"250px"}
//       language={language}
//       theme="vs-dark"
//       value={code}
//       options={{
//         inlineSuggest: true,
//         fontSize: "16px",
//         formatOnType: true,
//         autoClosingBrackets: true,
//         minimap: { scale: 1 },
//         automaticLayout: true,
//         matchBrackets: "always",
//       }}
//     />
//   );
// };

// export default CodeDisplay;

import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeDisplay = ({ code, language }) => {
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const toggleScroll = () => {
    setScrollEnabled((prevScrollEnabled) => !prevScrollEnabled);
  };

  return (
    <div
      style={{
        overflowY: scrollEnabled ? "auto" : "hidden",
        height: "250px",
        pointerEvents: scrollEnabled ? "auto" : "none",
      }}
      onDoubleClick={toggleScroll}
    >
      <Editor
        height={"100%"}
        language={language}
        theme="vs-dark"
        value={code}
        options={{
          inlineSuggest: true,
          fontSize: "16px",
          formatOnType: true,
          autoClosingBrackets: true,
          minimap: { scale: 1 },
          automaticLayout: true,
          matchBrackets: "always",
        }}
      />
    </div>
  );
};

export default CodeDisplay;

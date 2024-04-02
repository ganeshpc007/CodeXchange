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

// import React, { useState } from "react";
// import Editor from "@monaco-editor/react";

// const CodeDisplay = ({ code, language }) => {
//   const [scrollBlocked, setScrollBlocked] = useState(true);

//   const handleWheel = (e) => {
//     if (scrollBlocked) {
//       e.preventDefault();
//     }
//   };

//   const toggleScrollBlock = () => {
//     console.log("double click happend..");
//     setScrollBlocked(!scrollBlocked);
//   };

//   return (
//     <div
//       onWheel={handleWheel}
//       onDoubleClick={toggleScrollBlock}
//       style={{ position: "relative", height: "300px" }}
//     >
//       <Editor
//         height={"100%"}
//         language={language}
//         theme="vs-dark"
//         value={code}
//         options={{
//           inlineSuggest: true,
//           fontSize: "16px",
//           formatOnType: true,
//           autoClosingBrackets: true,
//           minimap: { scale: 1 },
//           automaticLayout: true,
//           matchBrackets: "always",
//         }}
//       />
//     </div>
//   );
// };

// export default CodeDisplay;

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

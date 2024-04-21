import React from "react";

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loading-text">
        <h3 className="subtitle">Happy</h3>
        <h1 className="title highlighted-text" style={{height:"70px"}}>
          Code
          <span style={{ color: "red" }}>X</span>
          change
        </h1>
      </div>
    </div>
  );
};

export default LoadingScreen;

import React from "react";

const GamePreview = ({ readyToStart, setReadyToStart }) => (
  <div className={`Game-Preview ${readyToStart ? "hide" : ""}`}>
    <div className="content">
      <h1>You have 5 seconds to memorize pictures</h1>

      {!readyToStart && (
        <button onClick={() => setReadyToStart(true)}>Click to start</button>
      )}
    </div>
  </div>
);

export default GamePreview;

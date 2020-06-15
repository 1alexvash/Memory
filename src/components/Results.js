import React from "react";
import { useLocation, Redirect, Link } from "react-router-dom";

const Results = () => {
  const location = useLocation();

  if (location.state === undefined) {
    return <Redirect to="/menu" />;
  }

  const secondsPassed = Math.round(
    (location.state.time.gameEnd - location.state.time.gameStart) / 1000
  );

  return (
    <div className="Results">
      <div className="time">Seconds passed: {secondsPassed}s</div>
      <div className="mistakes">Mistakes: {location.state.mistakes}</div>
      <Link to="/menu" className="play-again">
        Play again
      </Link>
    </div>
  );
};

export default Results;

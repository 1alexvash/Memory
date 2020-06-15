import React from "react";

import { useHistory } from "react-router-dom";

const Preloader = () => {
  let history = useHistory();
  setTimeout(() => {
    history.push("/menu");
  }, 5000);
  return (
    <div className="Preloader">
      <div className="content">
        <div className="title">Memory</div>
        <div class="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

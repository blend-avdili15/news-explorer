import React from "react";
import "./NothingFound.css";
import nothing from "../../images/not-found.svg";

function NothingFound({}) {
  return (
    <div className="nothing-found">
      <img src={nothing} alt="nothing found" className="nothing-found__image" />
      <h2 className="nothing-found__title">Nothing found</h2>
      <p className="nothing-found__text">
        Sorry, but nothing matched
        <span className="nothing-found__text_span">your search terms.</span>
      </p>
    </div>
  );
}

export default NothingFound;

import React from "react";
import "./PageNotFound.css";

// PageNotFound.js
export default function PageNotFound() {
  return (
    <div className="container">
      <div className="number">404</div>
      <div className="text">
        <span>Ooops...</span>
        <br />
        page not found
      </div>
      <a
        className="me"
        href="https://codepen.io/uzcho_/pens/popular/?grid_type=list"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  );
}

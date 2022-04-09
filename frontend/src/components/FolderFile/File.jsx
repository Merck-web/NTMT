import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function File({ file }) {
  return (
    <Link className="file-link">
      <img src='./images/file.png' alt='1' />
      <p>{file.nameFile}</p>
    </Link>
  );
}

export default File;

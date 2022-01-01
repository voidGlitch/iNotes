import React from "react";
import Notes from "./Notes";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const Home = (props) => {
  const { showalert } = props;
  return (
    <div className="container my-3">
      <Notes showalert={showalert} />
    </div>
  );
};

export default Home;

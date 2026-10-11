import React from "react";
import ReactDOM from "react-dom";
// import Handlebars from "handlebars";

import "./Hero.scss";

// const htmlContent = require("./Hero.html");
import htmlContent from './Hero.hbs';// works as template fn

// const template = Handlebars.compile(htmlContent);// fails

const Hero = (props) => {

  const {
    data
  } = props;

  const h_cont = htmlContent(data);

  return (
    <div className="App">
      <div dangerouslySetInnerHTML={{ __html: h_cont}} />
      {/* <div dangerouslySetInnerHTML={{ __html: template(data) }} /> */}
    </div>
  );
}

export default Hero

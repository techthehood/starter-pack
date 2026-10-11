import React from "react";
import ReactDOM from "react-dom";
// import Handlebars from "handlebars";

import "./Sample.scss";

// const htmlContent = require("./Sample.html");
import htmlContent from './Sample.hbs';// works as template fn

// const template = Handlebars.compile(htmlContent);// fails

const Sample = (props) => {

  const {
    data
  } = props;

  const h_cont = htmlContent(data);

  return (
    <div className="App">
      <div dangerouslySetInnerHTML={{ __html: h_cont }} />
      {/* <div dangerouslySetInnerHTML={{ __html: template(data) }} /> */}
    </div>
  );
}

export default Sample

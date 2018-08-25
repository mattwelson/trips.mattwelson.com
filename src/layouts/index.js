import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Footer from "../components/Footer";
import "./all.scss";

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet title="Matt Welson" />
    <div>{children()}</div>
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;

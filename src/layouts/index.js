import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Menu from "../components/Menu";
import Footer from "../components/Footer";
import "./all.sass";

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Menu trips={data.allMarkdownRemark.edges} />
    <Helmet title="Matt Welson" />
    <div>{children()}</div>
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;

export const pageQuery = graphql`
  query SearchQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "trip" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;

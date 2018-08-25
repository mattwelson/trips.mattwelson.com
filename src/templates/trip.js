import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import Content, { HTMLContent } from "../components/Content";

export const TripTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
  date
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <h4 className="trip__subtitle">{date}</h4>
          <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
            {title}
          </h1>
          <p>{description}</p>
          <PostContent content={content} />
        </div>
      </div>
    </section>
  );
};

TripTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet)
};

const Trip = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <TripTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      date={post.frontmatter.date}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      title={post.frontmatter.title}
      subtitle={post.frontmatter.subtitle}
    />
  );
};

Trip.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default Trip;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD MMM")
        title
        subtitle
      }
    }
  }
`;

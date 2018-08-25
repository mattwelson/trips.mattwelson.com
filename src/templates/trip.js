import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import Link from "gatsby-link";

import DirectionArrow from "../components/DirectionArrow";
import Menu from "../components/Menu";
import Content, { HTMLContent } from "../components/Content";

export const TripTemplate = ({
  content,
  contentComponent,
  description,
  title,
  subtitle,
  images,
  helmet,
  date,
  others,
  next,
  previous
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="app">
      {helmet || ""}
      <div className="details">
        {others && <Menu trips={others} />}
        <div className="columns">
          <h4 className="trip__subtitle">
            {date}
            {subtitle ? ` - ${subtitle}` : ""}
          </h4>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="trip__description">
            <PostContent content={content} />
          </div>
          <div className="buttons">
            <DirectionArrow target={previous}>&larr;</DirectionArrow>
            <DirectionArrow target={next}>&rarr;</DirectionArrow>
          </div>
        </div>
      </div>
      <div className="trip__image">
        {images.map(img => (
          <img id={img} src={img} />
        ))}
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
  const current = data.allMarkdownRemark.edges.filter(
    edge => post.id === edge.node.id
  )[0];

  return (
    <TripTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      date={post.frontmatter.date}
      helmet={<Helmet title={`${post.frontmatter.title}`} />}
      title={post.frontmatter.title}
      subtitle={post.frontmatter.subtitle}
      images={post.frontmatter.images}
      others={data.allMarkdownRemark.edges}
      next={current.next}
      previous={current.previous}
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
        images
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "trip" } } }
    ) {
      edges {
        next {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
        previous {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

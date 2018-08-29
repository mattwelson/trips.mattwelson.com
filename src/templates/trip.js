import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import DirectionArrow from '../components/DirectionArrow'
import Menu from '../components/Menu'
import Content, { HTMLContent } from '../components/Content'
import DesktopPhotos from '../components/DesktopPhotos'

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
  const PostContent = contentComponent || Content

  return (
    <section className="app">
      {helmet || ''}
      <div className="details">
        {others && <Menu trips={others} />}
        <div>
          <div className="fade delay">
            <h4 className="trip__subtitle">
              {date}
              {subtitle ? ` - ${subtitle}` : ''}
            </h4>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="trip__description">
              <PostContent content={content} />
            </div>
          </div>
          <div className="buttons">
            <DirectionArrow target={previous} direction="left" />
            <DirectionArrow target={next} />
          </div>
        </div>
      </div>
      <DesktopPhotos images={images} />
      <div className="trip__images trip__images--mobile">
        {images.map((img, i) => (
          <div className="trip__image" key={i}>
            <img id={img} src={img} key={i} />
          </div>
        ))}
      </div>
    </section>
  )
}

TripTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet)
}

const Trip = ({ data }) => {
  const { markdownRemark: post } = data
  const current = data.allMarkdownRemark.edges.filter(
    edge => post.id === edge.node.id
  )[0]

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
  )
}

Trip.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
}

export default Trip

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
`

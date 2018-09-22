import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import posed, { PoseGroup } from 'react-pose'

import DirectionArrow from '../components/DirectionArrow'
import Menu from '../components/Menu'
import Content, { HTMLContent } from '../components/Content'
import DesktopPhotos from '../components/DesktopPhotos'

const StaggerChildren = posed.div({
  enter: {
    staggerChildren: 100
  }
})
const FadeDown = posed.div({
  exit: {
    opacity: 0,
    y: -10
  },
  enter: {
    opacity: 1,
    y: 0
  }
})

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
  previous,
  cms,
  activeSlug
}) => {
  const PostContent = contentComponent || Content

  return (
    <div className="app">
      {helmet || ''}
      {others && <Menu trips={others} activeSlug={activeSlug} />}
      <PoseGroup animateOnMount={true}>
        <StaggerChildren key="trip">
          <section className="trip">
            <div className="details">
              <div className="">
                <FadeDown>
                  <h4 className="trip__subtitle">
                    {date}
                    {subtitle ? ` - ${subtitle}` : ''}
                  </h4>
                </FadeDown>
                <FadeDown>
                  <h1>{title}</h1>
                </FadeDown>
                <FadeDown>{description}</FadeDown>
                <FadeDown className="trip__description">
                  <PostContent content={content} />
                </FadeDown>
              </div>
              <FadeDown className="buttons">
                <DirectionArrow target={previous} direction="left" />
                <DirectionArrow target={next} />
              </FadeDown>
            </div>
            {!cms && (
              <DesktopPhotos images={images} next={next} previous={previous} />
            )}
            {!cms && (
              <div className="trip__images trip__images--mobile">
                {images.map(({ node }, i) => (
                  <div className="trip__image" key={i}>
                    <Img key={node.originalName} sizes={node.sizes} />
                  </div>
                ))}
              </div>
            )}
            {cms && (
              <div className="trip__images trip__images--cms">
                {images &&
                  images.map((image, i) => (
                    <div className="trip__image" key={i}>
                      <img key={image} src={image} />
                    </div>
                  ))}
              </div>
            )}
          </section>
        </StaggerChildren>
      </PoseGroup>
    </div>
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
  const current = data.allMarkdownRemark.edges.find(
    edge => post.id === edge.node.id
  )

  const images = post.frontmatter.images.map(imgName =>
    data.images.edges.find(({ node }) => {
      return imgName.indexOf(node.sizes.originalName) > -1
    })
  )

  const canonical = `https://trips.mattwelson.com${post.fields.slug}`

  return (
    <TripTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      date={post.frontmatter.date}
      helmet={
        <Helmet title={`${post.frontmatter.title} | Matt Welson`}>
          <meta property="og:title" content={post.frontmatter.title} />
          <meta property="og:description" content={post.excerpt} />
          <meta
            property="og:image"
            content={`https://trips.mattwelson.com${images[0].node.resize.src}`}
          />
          <meta property="og:url" content={canonical} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:site_name" content="Trips with Matt Welson" />

          <link rel="canonical" href={canonical} />
        </Helmet>
      }
      title={post.frontmatter.title}
      subtitle={post.frontmatter.subtitle}
      images={images}
      others={data.allMarkdownRemark.edges}
      next={current.next}
      previous={current.previous}
      activeSlug={post.fields.slug}
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
  query BlogPostByID($id: String!, $imgRegex: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 200)
      frontmatter {
        date(formatString: "DD MMM")
        title
        subtitle
        images
      }
      fields {
        slug
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
    images: allImageSharp(filter: { id: { regex: $imgRegex } }) {
      edges {
        node {
          sizes(quality: 90) {
            ...GatsbyImageSharpSizes_withWebp
            originalName
          }
          resize(width: 1200, height: 1200, quality: 90) {
            src
          }
        }
      }
    }
  }
`

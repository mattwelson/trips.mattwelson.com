import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { graphql } from 'gatsby'
import { HTMLContent } from '../components/Content'
import TripTemplate from '../layouts/TripTemplate'
import Layout from '../layouts'

const Trip = ({ data }) => {
  const { markdownRemark: post } = data
  const current = data.allMarkdownRemark.edges.find(
    edge => post.id === edge.node.id
  )

  const images = post.frontmatter.images.map(imgName =>
    data.images.edges.find(({ node }) => {
      return imgName.indexOf(node.fluid.originalName) > -1
    })
  )

  const canonical = `https://trips.mattwelson.com${post.fields.slug}`

  return (
    <Layout>
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
              content={`https://trips.mattwelson.com${
                images[0].node.resize.src
              }`}
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
    </Layout>
  )
}

Trip.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
}

export default Trip

export const pageQuery = graphql`
  query BlogPostByID($id: String!, $images: [String]!) {
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
      sort: { order: ASC, fields: [frontmatter___date] }
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
            date(formatString: "DD MMM")
            title
            subtitle
          }
        }
      }
    }
    images: allImageSharp(
      filter: { resize: { originalName: { in: $images } } }
    ) {
      edges {
        node {
          fluid(quality: 95) {
            ...GatsbyImageSharpFluid_withWebp
            originalName
            originalImg
          }
          resize(width: 1200, height: 1200, quality: 95) {
            src
          }
        }
      }
    }
  }
`

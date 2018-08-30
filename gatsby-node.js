const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage, createNodeField } = boundActionCreators

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fileAbsolutePath
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              images
            }
            internal {
              type
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => makeTrip(createPage, edge))

    makeTrip(createPage, posts[0], '/')
  })
}

// Strips the trip/ from the slug
const cleanSlug = p => /trip(.*)/.exec(p)[1]

// Creates a regex that can match images based on their id
const imgRegex = images =>
  `/${images.map(img => `${/img\/(.*)/.exec(img)[0]}\\sabsPath`).join('|')}/`

const makeTrip = (createPage, edge, overridePath) => {
  const id = edge.node.id
  fmImagesToRelativeHack(edge.node)
  createPage({
    path: overridePath || edge.node.fields.slug,
    component: path.resolve(
      `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
    ),
    // additional data can be passed via context
    context: {
      id,
      imgRegex: imgRegex(edge.node.frontmatter.images)
    }
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  fmImagesToRelativeHack(node)

  if (node.internal.type === `MarkdownRemark`) {
    const value = cleanSlug(createFilePath({ node, getNode }))
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}

const fileNodes = []
fmImagesToRelativeHack = node => {
  fileNodes.push(node)
  if (node.internal.type === `MarkdownRemark`) {
    // Convert paths in frontmatter to relative
    function makeRelative(value) {
      if (_.isString(value) && path.isAbsolute(value)) {
        let imagePath
        const foundImageNode = _.find(fileNodes, file => {
          if (!file.dir) return
          imagePath = path.join(file.dir, '..', value)
          return file.absolutePath === imagePath
        })
        if (foundImageNode) {
          return path.relative(
            path.join(node.fileAbsolutePath, '..'),
            imagePath
          )
        }
      }
      return value
    }
    _.each(node.frontmatter, (value, key) => {
      if (_.isArray(value)) {
        node.frontmatter[key] = _.map(value, val => {
          if (_.isObject(val)) {
            return _.mapValues(val, val2 => makeRelative(val2))
          } else {
            return makeRelative(val)
          }
        })
      } else {
        node.frontmatter[key] = makeRelative(value)
      }
    })
  }
}

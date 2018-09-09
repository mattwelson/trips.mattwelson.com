import React from 'react'
import Link from 'gatsby-link'

// supply link or onClick event
const RenderImageArrow = ({ direction, target, onClick, hasImage }) => {
  const dArrow =
    direction === 'left' ? <span>&larr;</span> : <span>&rarr;</span>
  const content = (
    <React.Fragment>
      {!hasImage && (
        <div className="image-arrow__extra">
          Go to{' '}
          <b>
            {(!hasImage && target.frontmatter.title) ||
              (direction === 'left' ? 'previous image' : 'next image')}
          </b>
        </div>
      )}
      <h1>{dArrow}</h1>
    </React.Fragment>
  )
  if (hasImage) {
    return (
      <div
        className={`image-arrow image-arrow--${direction} image-arrow--no-extra`}
        onClick={onClick}
      >
        {content}
      </div>
    )
  }
  return (
    <Link
      to={target.fields.slug}
      className={`image-arrow image-arrow--${direction}`}
    >
      {content}
    </Link>
  )
}

const ImageArrow = props => (
  <div
    className={`image-arrow__wrapper image-arrow__wrapper--${props.direction}`}
  >
    <RenderImageArrow {...props} />
  </div>
)

export default ImageArrow

import React from 'react'
import Link from 'gatsby-link'
import posed from 'react-pose'

const ArrowAnimation = posed.div({
  init: {
    x: ({ direction }) => (direction === 'left' ? '-100%' : '100%')
  },
  hover: {
    x: 0
  }
})

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
      <ArrowAnimation
        className={`image-arrow image-arrow--${direction} image-arrow--no-extra`}
        onClick={onClick}
        direction={direction}
      >
        {content}
      </ArrowAnimation>
    )
  }
  return (
    <ArrowAnimation direction={direction}>
      <Link
        to={target.fields.slug}
        className={`image-arrow image-arrow--${direction}`}
      >
        {content}
      </Link>
    </ArrowAnimation>
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

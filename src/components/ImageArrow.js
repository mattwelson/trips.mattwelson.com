import React from 'react'
import { Link } from 'gatsby'
import posed from 'react-pose'

const Grow = posed.div({
  init: {
    width: 0,
    afterChildren: true
  },
  hover: {
    width: 'auto',
    beforeChildren: true
  }
})

const SlideIn = posed.div({
  init: {
    x: ({ direction }) => (direction === 'left' ? -117 : 117),
    opacity: 1
  },
  hover: {
    x: 0
  }
})

const Fade = posed.div({
  init: {
    opacity: ({ from = 0 }) => from
  },
  hover: {
    opacity: ({ to = 1 }) => to
  }
})

const Hoverable = posed.div({
  hoverable: true,
  init: {
    opacity: 0.7
  },
  hover: {
    opacity: 0.9
  }
})

// supply link or onClick event
const RenderImageArrow = ({ direction, target, onClick, hasImage }) => {
  const dArrow =
    direction === 'left' ? <span>&larr;</span> : <span>&rarr;</span>
  if (hasImage) {
    return (
      <div
        className={`image-arrow image-arrow--${direction} image-arrow--no-extra`}
        onClick={onClick}
        direction={direction}
      >
        <h1>{dArrow}</h1>
      </div>
    )
  }
  return (
    <Link
      to={target.fields.slug}
      className={`image-arrow image-arrow--${direction}`}
    >
      <Grow>
        <Fade>
          <div className="image-arrow__extra">
            Go to <b>{!hasImage && target.frontmatter.title}</b>
          </div>
        </Fade>
      </Grow>
      <h1>{dArrow}</h1>
    </Link>
  )
}

const ImageArrow = props => (
  <div
    className={`image-arrow__wrapper image-arrow__wrapper--${props.direction}`}
  >
    <SlideIn direction={props.direction} className="hidden">
      <Hoverable withParent={false}>
        <RenderImageArrow {...props} />
      </Hoverable>
    </SlideIn>
  </div>
)

export default ImageArrow

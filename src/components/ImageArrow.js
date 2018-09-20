import React from 'react'
import Link from 'gatsby-link'
import posed from 'react-pose'

const GrowAndFade = posed.div({
  init: {
    width: 0,
    opacity: ({ from = 1 }) => from
  },
  hover: {
    width: 'auto',
    opacity: ({ to = 1 }) => to
  }
})
const Hoverable = posed.div({
  hoverable: true
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
      <GrowAndFade from={0}>
        <div className="image-arrow__extra">
          Go to <b>{!hasImage && target.frontmatter.title}</b>
        </div>
      </GrowAndFade>
      <h1>{dArrow}</h1>
    </Link>
  )
}

const ImageArrow = props => (
  <div
    className={`image-arrow__wrapper image-arrow__wrapper--${props.direction}`}
  >
    <GrowAndFade>
      <Hoverable withParent={false}>
        <RenderImageArrow {...props} />
      </Hoverable>
    </GrowAndFade>
  </div>
)

export default ImageArrow

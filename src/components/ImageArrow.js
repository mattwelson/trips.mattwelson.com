import React from 'react'
import Link from 'gatsby-link'
import posed from 'react-pose'

const ArrowAnimation = posed.div({
  init: {
    x: 0,
    opacity: 0.5
  },
  hover: {
    x: ({ direction }) => (direction === 'left' ? '117px' : '-117px'),
    opacity: 0.7
  },
  expanded: {
    x: ({ direction }) => (direction === 'left' ? '100%' : '-100%'),
    opacity: 0.9
  }
})

const ArrowExtra = posed.div({
  init: {
    opacity: 0
  },
  expanded: {
    opacity: 1
  }
})

// supply link or onClick event
const RenderImageArrow = ({
  direction,
  target,
  onClick,
  hasImage,
  expanded,
  toggleMouseIn
}) => {
  const dArrow =
    direction === 'left' ? <span>&larr;</span> : <span>&rarr;</span>
  const content = (
    <React.Fragment>
      {!hasImage && (
        <ArrowExtra className="image-arrow__extra">
          Go to{' '}
          <b>
            {(!hasImage && target.frontmatter.title) ||
              (direction === 'left' ? 'previous image' : 'next image')}
          </b>
        </ArrowExtra>
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
        pose={expanded ? 'expanded' : ''}
        onMouseEnter={toggleMouseIn}
        onMouseLeave={toggleMouseIn}
      >
        {content}
      </ArrowAnimation>
    )
  }
  return (
    <ArrowAnimation
      direction={direction}
      pose={expanded ? 'expanded' : ''}
      onMouseOver={toggleMouseIn}
      onMouseOut={toggleMouseIn}
    >
      <Link
        to={target.fields.slug}
        className={`image-arrow image-arrow--${direction}`}
      >
        {content}
      </Link>
    </ArrowAnimation>
  )
}

class ImageArrow extends React.Component {
  state = {
    mouseIn: false
  }

  arrow = React.createRef()

  toggleMouseIn = e => {
    console.log(e)
    console.log(e.target)
    const mouseIn = this.arrow.current.contains(e.target)
    this.setState(() => ({
      mouseIn
    }))
  }

  render() {
    return (
      <div
        className={`image-arrow__wrapper image-arrow__wrapper--${
          this.props.direction
        }`}
        ref={this.arrow}
      >
        <div className="image-arrow__wrapper-inner">
          <RenderImageArrow
            expanded={this.state.mouseIn}
            {...this.props}
            toggleMouseIn={this.toggleMouseIn}
          />
        </div>
      </div>
    )
  }
}

export default ImageArrow

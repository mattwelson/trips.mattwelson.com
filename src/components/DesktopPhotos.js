import React from 'react'
import Img from 'gatsby-image'
import posed from 'react-pose'
import { navigate } from 'gatsby'

import ImageArrow from './ImageArrow'
import ImageDots from './ImageDots'

const PhotoWrapper = posed.div({
  hoverable: true
})

const SelectedImage = posed.div({
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
})

const Reveal = posed.div({
  exit: {
    position: 'relative',
    left: 0,
    background: ({ background }) => background || 'white',
    flip: true
  },
  enter: {
    left: '100%',
    flip: true,
    transition: {
      ease: 'easeOut'
    }
  }
})

const StaggerChildren = posed.div({
  enter: {
    staggerChildren: 500,
    staggerDirection: -1,
    delayChildren: 400
  }
})

class DesktopPhotos extends React.Component {
  state = {
    imageIndex: 0
  }

  select = imageIndex => this.setState(() => ({ imageIndex }))

  handleKeyDown = e => {
    const key = e.key
    const { imageIndex } = this.state
    const imageCount = this.props.images.length
    const { next, previous } = this.props
    if (key === 'ArrowLeft') {
      if (imageIndex === 0) {
        if (previous) return navigate(previous.fields.slug)
        return
      }
      this.select(imageIndex - 1)
    }
    if (key === 'ArrowRight') {
      if (imageIndex + 1 === imageCount) {
        if (next) return navigate(next.fields.slug)
        return
      }
      this.select(imageIndex + 1)
    }
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    const { images, next, previous } = this.props
    const { imageIndex } = this.state

    const hasImageLeft = imageIndex > 0
    const hasImageRight = imageIndex < images.length - 1

    const arrowLeft = (previous || hasImageLeft) && (
      <ImageArrow
        direction="left"
        target={previous}
        hasImage={hasImageLeft}
        onClick={() => this.select(imageIndex - 1)}
      />
    )
    const arrowRight = (next || hasImageRight) && (
      <ImageArrow
        direction="right"
        target={next}
        hasImage={hasImageRight}
        onClick={() => this.select(imageIndex + 1)}
      />
    )

    return (
      <PhotoWrapper className="trip__images trip__images--desktop" key="child">
        {arrowLeft}
        {arrowRight}
        <ImageDots
          length={images.length}
          select={this.select}
          selectedIndex={imageIndex}
        />
        {images.map(({ node }, i) => (
          <SelectedImage
            className="trip__image"
            pose={i === imageIndex ? 'visible' : 'hidden'}
            key={i}
          >
            <Img sizes={node.sizes} key={i} />
          </SelectedImage>
        ))}
        <StaggerChildren className="trip__reveal-wrap">
          <Reveal
            className="trip__reveal"
            background="#5f6d77"
            key="reveal-color"
          />
          <Reveal className="trip__reveal" key="reveal-white" />
        </StaggerChildren>
      </PhotoWrapper>
    )
  }
}

export default DesktopPhotos

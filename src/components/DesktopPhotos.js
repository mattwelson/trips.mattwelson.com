import React from 'react'
import Img from 'gatsby-image'
import posed from 'react-pose'

import ImageArrow from './ImageArrow'
import ImageDots from './ImageDots'

const Hoverable = posed.div({
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

class DesktopPhotos extends React.Component {
  state = {
    imageIndex: 0
  }

  select = imageIndex => this.setState(() => ({ imageIndex }))

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
      <Hoverable className="trip__images trip__images--desktop">
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
      </Hoverable>
    )
  }
}

export default DesktopPhotos

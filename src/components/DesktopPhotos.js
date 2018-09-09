import React from 'react'
import Img from 'gatsby-image'

import ImageArrow from './ImageArrow'

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
      <div className="trip__images trip__images--desktop">
        {arrowLeft}
        {arrowRight}
        {images.length > 1 && (
          <div className="trip__image-dots-box">
            <div className="trip__image-dots fade delay2">
              <div className="image-dots__arrow">&larr;</div>
              {images.map((img, i) => (
                <div
                  className={`dot ${i === imageIndex ? 'dot--selected' : ''}`}
                  key={i}
                  onClick={() => this.select(i)}
                />
              ))}
              <div className="image-dots__arrow">&rarr;</div>
            </div>
          </div>
        )}
        {images.map(({ node }, i) => (
          <div
            className={`trip__image reveal delay-half ${
              i === imageIndex ? 'image--selected' : ''
            }`}
            key={i}
          >
            <Img sizes={node.sizes} key={i} />
          </div>
        ))}
      </div>
    )
  }
}

export default DesktopPhotos

import React from 'react'

class DesktopPhotos extends React.Component {
  state = {
    imageIndex: 0
  }

  select = imageIndex => this.setState(() => ({ imageIndex }))

  render() {
    const { images } = this.props
    const { imageIndex } = this.state
    return (
      <div className="trip__images trip__images--desktop">
        {images.length > 1 && (
          <div className="trip__image-dots-box">
            <div className="trip__image-dots fade delay2">
              <div className="image__arrow">&larr;</div>
              {images.map((img, i) => (
                <div
                  className={`dot ${i === imageIndex ? 'dot--selected' : ''}`}
                  key={i}
                  onClick={() => this.select(i)}
                />
              ))}
              <div className="image__arrow">&rarr;</div>
            </div>
          </div>
        )}
        {images.map((img, i) => (
          <div
            className={`trip__image reveal ${
              i === imageIndex ? 'image--selected' : ''
            }`}
            key={i}
          >
            <img src={img} key={i} />
          </div>
        ))}
      </div>
    )
  }
}

export default DesktopPhotos
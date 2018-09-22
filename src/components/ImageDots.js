import React from 'react'
import posed from 'react-pose'

const StaggerChildren = posed.div({
  enter: {
    staggerChildren: 50,
    opacity: 1
  },
  exit: {
    opacity: 0,
    beforeChildren: true
  }
})

const Child = posed.div({
  exit: {
    y: -30
  },
  enter: {
    y: 0
  }
})

const ImageDots = ({ length, select, selectedIndex }) => {
  return (
    length > 1 && (
      <StaggerChildren className="trip__image-dots-box" key="stagger">
        <div className="trip__image-dots">
          <Child className="image-dots__arrow" key="left" light>
            &larr;
          </Child>
          {new Array(length).fill().map((_, i) => (
            <Child
              className={`dot ${i === selectedIndex ? 'dot--selected' : ''}`}
              key={i}
              onClick={() => select(i)}
              id={i}
              selectedIndex={selectedIndex}
              pose={selectedIndex === i ? 'selected' : ''}
            />
          ))}
          <Child className="image-dots__arrow" key="right" light>
            &rarr;
          </Child>
        </div>
      </StaggerChildren>
    )
  )
}

export default ImageDots

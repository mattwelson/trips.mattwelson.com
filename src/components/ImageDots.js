import React from 'react'
import posed, { PoseGroup } from 'react-pose'

const StaggerChildren = posed.div({
  enter: {
    staggerChildren: 50
  }
})

const Hoverable = posed.div({
  hoverable: true
})

const Child = posed.div({
  init: {
    scale: 1
  },
  exit: {
    y: -50,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: ({ light }) => (light ? 0.3 : 0.6)
  },
  selected: {
    opacity: 0.9
  },
  hover: {
    scale: 1.05,
    opacity: 1
  }
})

const ImageDots = ({ length, select, selectedIndex }) => {
  return (
    <PoseGroup animateOnMount={true} selectedIndex={selectedIndex}>
      {length > 1 && (
        <StaggerChildren
          className="trip__image-dots-box"
          key="stagger"
          withParent={false}
        >
          <div className="trip__image-dots">
            <Child className="image-dots__arrow" key="left" light>
              &larr;
            </Child>
            {new Array(length).fill().map((_, i) => (
              <Hoverable>
                <Child
                  className={`dot ${
                    i === selectedIndex ? 'dot--selected' : ''
                  }`}
                  key={i}
                  onClick={() => select(i)}
                  id={i}
                  selectedIndex={selectedIndex}
                  pose={selectedIndex === i ? 'selected' : ''}
                />
              </Hoverable>
            ))}
            <Child className="image-dots__arrow" key="right" light>
              &rarr;
            </Child>
          </div>
        </StaggerChildren>
      )}
    </PoseGroup>
  )
}

export default ImageDots

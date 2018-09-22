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
    y: -50
  },
  enter: {
    y: 0
  },
  hover: {
    scale: 1.05
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
              <Hoverable key={i}>
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

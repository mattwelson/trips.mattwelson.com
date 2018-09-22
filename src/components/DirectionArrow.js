import React from 'react'
import { Link } from 'gatsby'
import arrowSvg from '../img/arrow-button.svg'
import posed from 'react-pose'

const Hoverable = posed.div({
  hoverable: true
})

const Arrow = posed.div({
  init: {
    opacity: 0.9,
    scale: 1,
    rotate: 0
  },
  hover: {
    opacity: 1,
    scale: 1.05,
    rotate: '5deg'
  }
})

const HelperText = posed.div({
  init: {
    opacity: 0,
    y: -10
  },
  hover: {
    delay: 200,
    opacity: 1,
    y: 0
  }
})

const DirectionArrow = ({ target, direction = 'right' }) => (
  <Hoverable className={`arrow__wrapper arrow__wrapper--${direction}`}>
    <div className="arrow">
      {!!target || (
        <img
          src={arrowSvg}
          alt="No trip"
          className={`arrow arrow--${direction} arrow--disabled`}
        />
      )}
      {!!target && (
        <Arrow>
          <Link
            to={target.fields.slug}
            rel={direction === 'right' ? 'next' : 'prev'}
            className="arrow__link"
          >
            <img
              src={arrowSvg}
              alt={target.frontmatter.title}
              className={`arrow arrow--${direction}`}
            />
          </Link>
        </Arrow>
      )}
    </div>
    {target && (
      <HelperText className="arrow__helper">
        Go to <b>{target.frontmatter.title}</b>
      </HelperText>
    )}
  </Hoverable>
)

export default DirectionArrow

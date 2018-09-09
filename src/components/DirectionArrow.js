import React from 'react'
import Link from 'gatsby-link'
import arrowSvg from '../img/arrow-button.svg'

const DirectionArrow = ({ target, direction = 'right' }) => (
  <React.Fragment>
    <div className="arrow">
      {!!target || (
        <img
          src={arrowSvg}
          alt="No trip"
          className={`arrow arrow--${direction} arrow--disabled`}
        />
      )}
      {!!target && (
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
      )}
    </div>
    {target && (
      <div className="arrow__helper">
        Go to <b>{target.frontmatter.title}</b>
      </div>
    )}
  </React.Fragment>
)

export default DirectionArrow

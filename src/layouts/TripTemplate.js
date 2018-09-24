import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import posed from 'react-pose'

import DirectionArrow from '../components/DirectionArrow'
import Menu from '../components/Menu'
import Content from '../components/Content'
import DesktopPhotos from '../components/DesktopPhotos'

const StaggerChildren = posed.div({
  enter: {
    staggerChildren: 100,
    delayChildren: 300
  }
})
const FadeDown = posed.div({
  exit: {
    opacity: 0,
    y: -10
  },
  enter: {
    opacity: 1,
    y: 0
  }
})

export const TripTemplate = ({
  content,
  contentComponent,
  description,
  title,
  subtitle,
  images,
  helmet,
  date,
  others,
  next,
  previous,
  activeSlug
}) => {
  const PostContent = contentComponent || Content

  return (
    <div className="app">
      {helmet || ''}
      {others && <Menu trips={others} activeSlug={activeSlug} />}
      <StaggerChildren key="trip">
        <section className="trip">
          <div className="details">
            <div className="">
              <FadeDown>
                <h4 className="trip__subtitle">
                  {date}
                  {subtitle ? ` - ${subtitle}` : ''}
                </h4>
              </FadeDown>
              <FadeDown>
                <h1>{title}</h1>
              </FadeDown>
              <FadeDown>{description}</FadeDown>
              <FadeDown className="trip__description">
                <PostContent content={content} />
              </FadeDown>
            </div>
            <FadeDown className="buttons">
              <DirectionArrow target={previous} direction="left" />
              <DirectionArrow target={next} />
            </FadeDown>
          </div>
          <DesktopPhotos images={images} next={next} previous={previous} />

          <div className="trip__images trip__images--mobile">
            {images.map(({ node }, i) => (
              <div className="trip__image" key={i}>
                <Img key={node.originalName} sizes={node.sizes} />
              </div>
            ))}
          </div>
        </section>
      </StaggerChildren>
    </div>
  )
}

TripTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet)
}

export default TripTemplate

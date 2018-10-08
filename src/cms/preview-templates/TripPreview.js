import React from 'react'

import Content from '../../components/Content'

export const TripTemplate = ({
  date,
  subtitle,
  title,
  description,
  content,
  previous,
  next,
  images
}) => {
  return (
    <section className="trip">
      <div className="details">
        <div className="">
          <h4 className="trip__subtitle">
            {date.toString()}
            {subtitle ? ` - ${subtitle}` : ''}
          </h4>
          <h1>{title}</h1>
          {description}
          <div className="trip__description">
            <Content content={content} />
          </div>
        </div>
      </div>
      <div className="trip__images trip__images--cms">
        {images &&
          images.map((image, i) => (
            <div className="trip__image" key={i}>
              <img key={image} src={image} alt="" />
            </div>
          ))}
      </div>
    </section>
  )
}

const TripPreview = ({ entry, widgetFor }) => (
  <TripTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    date={entry.getIn(['data', 'date'])}
    title={entry.getIn(['data', 'title'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    images={entry.getIn(['data', 'images'])}
  />
)

export default TripPreview

import React from 'react'
import PropTypes from 'prop-types'
import { TripTemplate } from '../../templates/trip'

const TripPreview = ({ entry, widgetFor }) => (
  <TripTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    date={entry.getIn(['data', 'date'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    images={entry.getIn(['data', 'images'])}
  />
)

TripPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
}

export default TripPreview

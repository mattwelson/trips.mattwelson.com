import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'

const RoutesContainer = posed.div({})

class Transition extends PureComponent {
  render() {
    const { children, location } = this.props

    // To enable page transitions on mount / initial load,
    // use the prop `animateOnMount={true}` on `PoseGroup`.
    return (
      <PoseGroup>
        <RoutesContainer key={location.pathname}>{children}</RoutesContainer>
      </PoseGroup>
    )
  }
}

Transition.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
}

export default Transition

import React from 'react'
import Transition from './Transition'

export default ({ element, props }) => {
  return <Transition {...props}>{element}</Transition>
}

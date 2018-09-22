import React from 'react'
import Helmet from 'react-helmet'

import Footer from '../components/Footer'
import './all.scss'

const Layout = ({ children, data }) => (
  <div className="">
    <Helmet title="Matt Welson" />
    <div>{children}</div>
    <Footer />
  </div>
)

export default Layout

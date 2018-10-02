import React from 'react'
import Helmet from 'react-helmet'

import Footer from '../components/Footer'
import './all.scss'

const Layout = ({ children, data }) => (
  <div className="not-ie">
    <Helmet title="Matt Welson" />
    <div className="show-ie upgrade">
      You're using an out of date browser. Some parts of the site will not
      function correctly, sorry.
    </div>
    <div>{children}</div>
    <Footer />
  </div>
)

export default Layout

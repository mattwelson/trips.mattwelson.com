import React from 'react'
import settings from '../utils/settings'
import Layout from '../layouts'

const NotFoundPage = () => (
  <Layout>
    <div className="error-page">
      <h1>Oops</h1>
      <p>
        Sorry, one of us made a mistake. Probably me! If you have found
        something embarrassingly broken please let me know!
      </p>
      <p>
        <a href={settings.twitter} target="_blank">
          @mattwelson
        </a>
      </p>
    </div>
  </Layout>
)

export default NotFoundPage

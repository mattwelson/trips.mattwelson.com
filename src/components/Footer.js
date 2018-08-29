import React from 'react'
import githubLogo from '../img/github-icon.svg'
import settings from '../utils/settings'

const Footer = () => (
  <footer>
    <p>
      Site built by{' '}
      <a href={settings.twitter} target="_blank">
        @mattwelson
      </a>{' '}
      - ask me how!
    </p>
    <p>Images taken with our Sony a6000.</p>
    <p>
      For more photos check out my{' '}
      <a href={settings.instagram} target="_blank">
        Instagram
      </a>
      , for better photos checkout{' '}
      <a href={settings.instagramAlice} target="_blank">
        Alice's
      </a>
      .
    </p>
    <a href={settings.github} target="_blank">
      <img src={githubLogo} className="footer__github" />
    </a>
  </footer>
)

export default Footer

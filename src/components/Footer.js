import React from 'react'
import githubLogo from '../img/github-icon.svg'
import settings from '../utils/settings'

const Footer = () => (
  <footer>
    <p>
      Site built by{' '}
      <a href={settings.twitter} target="_blank" rel="noopener noreferrer">
        @mattwelson
      </a>{' '}
      - ask me how!
    </p>
    <p>Images taken with our Sony a6000.</p>
    <p>
      For more photos check out my{' '}
      <a href={settings.instagram} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
      , for better photos checkout{' '}
      <a
        href={settings.instagramAlice}
        target="_blank"
        rel="noopener noreferrer"
      >
        Alice's
      </a>
      .
    </p>
    <a href={settings.github} target="_blank" rel="noopener noreferrer">
      <img src={githubLogo} className="footer__github" alt="Github link" />
    </a>
  </footer>
)

export default Footer

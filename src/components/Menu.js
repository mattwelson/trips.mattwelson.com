import React from 'react'
import { Link } from 'gatsby'
import posed from 'react-pose'
import { relative } from 'path'

const MenuLink = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    rotate: 0,
    opacity: 0.7,
    position: 'relative'
  },
  hover: {
    scale: 1.1,
    rotate: '1deg',
    opacity: 1
  }
})

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99]
}

const SlideDown = posed.div({
  closed: {
    y: '-100%',
    opacity: 0.5,
    transition,
    afterChildren: true
  },
  opened: {
    y: 0,
    opacity: 0.98,
    transition,
    beforeChildren: true,
    staggerChildren: 50
  }
})

const MenuHeadings = posed.h1({
  hoverable: true,
  hover: {
    opacity: 1,
    scale: 1.05
  },
  closed: {
    y: '-2rem',
    opacity: 0
  },
  opened: {
    scale: 1,
    y: 0,
    opacity: 0.9
  }
})

class Menu extends React.Component {
  state = {
    opened: false
  }

  toggleMenu = () => this.setState(({ opened }) => ({ opened: !opened }))

  render() {
    const { trips, activeSlug } = this.props
    return (
      <div className="menu__wrapper">
        <MenuLink>
          <h6 className="menu-toggle" onClick={this.toggleMenu}>
            TRIPS
          </h6>
        </MenuLink>
        <SlideDown
          className="menu"
          onClick={this.toggleMenu}
          pose={this.state.opened ? 'opened' : 'closed'}
        >
          <div className="menu__list">
            <div onClick={e => e.stopPropagation()}>
              {trips.map(({ node: trip }) => (
                <MenuHeadings key={trip.fields.slug} className="menu__header">
                  <Link
                    to={trip.fields.slug}
                    className={
                      activeSlug === trip.fields.slug
                        ? 'menu__item--active'
                        : ''
                    }
                  >
                    {trip.frontmatter.title}
                  </Link>
                </MenuHeadings>
              ))}
            </div>
          </div>
        </SlideDown>
      </div>
    )
  }
}

export default Menu

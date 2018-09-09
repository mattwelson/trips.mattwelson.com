import React from 'react'
import Link from 'gatsby-link'

class Menu extends React.Component {
  state = {
    open: false
  }

  toggleMenu = () => this.setState(({ open }) => ({ open: !open }))

  render() {
    const { trips, activeSlug } = this.props
    return (
      <div>
        <h6 className="menu-toggle" onClick={this.toggleMenu}>
          TRIPS
        </h6>
        <div
          className={`menu ${this.state.open ? 'menu--open' : ''}`}
          onClick={this.toggleMenu}
        >
          <div className="menu__list">
            <div onClick={e => e.stopPropagation()}>
              {trips.map(({ node: trip }) => (
                <h1 key={trip.fields.slug}>
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
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Menu

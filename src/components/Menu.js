import React from "react";
import Link from "gatsby-link";

class Menu extends React.Component {
  state = {
    open: false
  };
  render() {
    const { trips } = this.props;
    return (
      <div>
        <h6>TRIPS</h6>
        <div className={`menu ${this.state.open ? "menu--open" : ""}`}>
          <div className="menu__list">
            {trips.map(({ node: trip }) => (
              <Link to={trip.fields.slug} key={trip.fields.slug}>
                <h1>{trip.frontmatter.title}</h1>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;

import React from "react";
import Link from "gatsby-link";

const DirectionArrow = ({ target, children }) => (
  <div>
    {!!target || <div>{children}</div>}
    {!!target && <Link to={target.fields.slug}>{children}</Link>}
  </div>
);

export default DirectionArrow;

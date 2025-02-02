import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar__brand"></div>
      <ul className="navbar__links">
        <li className="navbar__link navbar__link-active"></li>
        <li className="navbar__link"></li>
        <li className="navbar__link"></li>
      </ul>
      <button className="navbar__toggle"></button>
    </div>
  );
};

export default Navbar;

import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="Header-Main">
      <div>
        <ul className="header-list">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/userList">User List</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;

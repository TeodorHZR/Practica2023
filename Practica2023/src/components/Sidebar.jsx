import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
    

    return (<div>
        <Nav className="col-md-12 d-md-block bg-light sidebar">
      <div className="sidebar-sticky"></div>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/home">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/categories">
          Categories
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/products">
          Products
        </Nav.Link>
      </Nav.Item>
    </Nav>
    </div>);
};

export default Sidebar;



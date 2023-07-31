import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList.jsx";
import Sidebar from "./components/Sidebar";
import CategoryList from "./pages/CategoryList";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <Container fluid>
        <Row>
          <SidebarWithCondition />
          <Col lg={10} xs={12}>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/admin/home" element={<Home />} />
              <Route path="/admin/categories" element={<CategoryList />} />
              <Route path="/admin/categories/:categoryId" element={<CategoryList />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/products/:productId" element={<ProductList />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

function SidebarWithCondition() {
  const location = useLocation();

  if (location.pathname === "/") {
    return null; // Do not render Sidebar on the LoginForm page
  }

  return (
    <Col lg={2}>
      <Sidebar />
    </Col>
  );
}

export default App;

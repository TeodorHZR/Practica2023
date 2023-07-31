import React, { useEffect, useState } from "react";
import { getCategories, getCategoryId } from "../services/categoryService";
import { getProductsByCategoryId, updateProduct, deleteProduct, insertProduct } from "../services/productService";
import { Container, Row, Col, Form, Button, Pagination, Table, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const ProductList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProductId, setUpdateProductId] = useState(null);
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateProductPrice, setUpdateProductPrice] = useState("");
  const [updateProductCategoryId, setUpdateProductCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const data = await getCategories(0, 100, "ASC");
        setCategories(data);
      } catch (error) {
        console.error("Eroare la obtinerea categoriilor:", error);
      }
    };

    fetchAllCategories();
  }, []);

  useEffect(() => {
    const fetchProductsByCategoryId = async () => {
      try {
        if (selectedCategoryId !== null) {
          const products = await getProductsByCategoryId(selectedCategoryId);
          setProducts(products);
        }
      } catch (error) {
        console.error("Eroare la obtinerea produselor:", error);
      }
    };

    fetchProductsByCategoryId();
  }, [selectedCategoryId]);

  useEffect(() => {
    const fetchCategoriesBySearchTerm = async () => {
      try {
        const filteredCategories = await getCategories(0, 100, "ASC");
        setCategories(filteredCategories.filter((category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      } catch (error) {
        console.error("Eroare la cautarea categoriilor:", error);
      }
    };

    fetchCategoriesBySearchTerm();
  }, [searchTerm]);

  const handleDropdownClick = () => {
    setShowDropdown((prevState) => !prevState);
    setSelectedCategoryId(null);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInsertProduct = async () => {
    try {
      if (!productName || !productPrice || !selectedCategoryId) {
        alert("Completeaza toate campurile pentru inserare!");
        return;
      }
  
      const categoryId = await getCategoryId(selectedCategoryId);
      if (!categoryId) {
        console.error("Categorie invalida sau eroare la obtinerea ID-ului categoriei.");
        return;
      }
      console.log(categoryId);
      await insertProduct(productName, productPrice, categoryId);
      console.log(categoryId);
      const updatedProducts = await getProductsByCategoryId(categoryId);
      setProducts(updatedProducts);
  
      setProductName("");
      setProductPrice("");
    } catch (error) {
      console.error("Eroare la inserare produs:", error);
    }
  };
  
  const handleCategorySelection = async (categoryName) => {
    setShowDropdown(false);
    const categoryId = await getCategoryId(categoryName);
    setSelectedCategoryId(categoryId);
  };

  const handleUpdateProductButtonClick = (product) => {
    setUpdateProductId(product.productId);
    setUpdateProductName(product.productName);
    setUpdateProductPrice(product.productPrice);
    setUpdateProductCategoryId(product.categoryId);
    setShowUpdateModal(true);
  };
  
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
  
      const updatedProducts = await getProductsByCategoryId(selectedCategoryId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Eroare la stergere:", error);
    }
  };
  
  const handleExecuteUpdate = async () => {
    try {
      if (!updateProductName || !updateProductPrice || !updateProductCategoryId) {
        alert("Completeaza toate campurile pentru update!");
        return;
      }

      await updateProduct(updateProductId, updateProductName, updateProductPrice, updateProductCategoryId);

      const updatedProducts = await getProductsByCategoryId(selectedCategoryId);
      setProducts(updatedProducts);

      setShowUpdateModal(false);
    } catch (error) {
      console.error("Eroare la update produs:", error);
    }
  };

  return (
    <div>
      <h1>Lista de produse</h1>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          onClick={handleDropdownClick}
        >
          {selectedCategoryId !== null ? categories.find(category => category.id === selectedCategoryId)?.name : "Selecteaza o categorie"}
        </button>
        {showDropdown && (
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ display: "block" }}>
            <Form.Control
              type="text"
              placeholder="Cauta categorie"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            {categories.map((category) => (
              <button
                key={category.id}
                className="dropdown-item"
                onClick={() => handleCategorySelection(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
      {selectedCategoryId !== null && (
        <div>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nume</th>
                <th>Pret</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productName}</td>
                  <td>{product.productPrice}</td>
                  <td>
                    <Button onClick={() => handleUpdateProductButtonClick(product)} className="btn btn-primary">
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => handleDelete(product.productId)} className="btn btn-danger">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nume</Form.Label>
              <Form.Control
                type="text"
                value={updateProductName}
                onChange={(e) => setUpdateProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pret</Form.Label>
              <Form.Control
                type="number"
                value={updateProductPrice}
                onChange={(e) => setUpdateProductPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CategoryId</Form.Label>
              <Form.Control
                type="text"
                value={updateProductCategoryId}
                onChange={(e) => setUpdateProductCategoryId(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleExecuteUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <h2>Adauga produs</h2>
      <Form>
        <Form.Group>
          <Form.Label>Nume</Form.Label>
          <Form.Control
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Pret</Form.Label>
          <Form.Control
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Categorie</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">Selecteaza o categorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleInsertProduct}>
          Adauga produs
        </Button>
      </Form>
    </div>
  );
};

export default ProductList;

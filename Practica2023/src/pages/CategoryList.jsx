import React, { useEffect, useState } from "react";
import { deleteCategory, getCategories, getCategoryId, insertCategory, updateCategory } from "../services/categoryService";
import { Container, Row, Col, Form, Button, Pagination, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [nameText, setNameText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedCategoryId, setSearchedCategoryId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const [updateCategoryId, setUpdateCategoryId] = useState(null); 
  const [updateNameText, setUpdateNameText] = useState('');
  const [updateDescriptionText, setUpdateDescriptionText] = useState('');
  const [sortByOpen, setSortByOpen] = useState(false); 
  const [sortOrder, setSortOrder] = useState('ASC');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories(0, 100, sortOrder);
        setCategories(data);
      } catch (error) {
        console.error("Eroare la obtinerea categoriilor:", error);
      }
    };
  
    fetchData();
  
  }, [sortOrder]);
  

  useEffect(() => {
    console.log("searchedCategoryId:", searchedCategoryId);
  }, [searchedCategoryId]);

  const handleSortByClick = () => {
    setSortByOpen((prevState) => !prevState);
  };

  const handleInsert = async () => {
    try {
      if (!nameText || !descriptionText) {
        alert("Completeaza numele si descrierea categoriei!");
        return;
      }
      await insertCategory(nameText, descriptionText);
      const updatedCategories = await getCategories(0, 100,sortOrder);
      setCategories(updatedCategories);
      setNameText('');
      setDescriptionText('');
    } catch (error) {
      console.error("Eroare la inserare:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!searchedCategoryId) {
        alert("Completeaza numele categoriei!");
        return;
      }

      await deleteCategory(searchedCategoryId);

      const updatedCategories = await getCategories(0, 100,sortOrder);
      setCategories(updatedCategories);

      setSearchTerm('');
      setSearchedCategoryId(null);
    } catch (error) {
      console.error("Eroare la stergere:", error);
    }
  };

  const handleUpdateButtonClick = async (category) => {
    try {
      const cat = await getCategoryId(category.name);
      console.log(cat);
      setUpdateCategoryId(cat);
      setUpdateNameText(category.name);
      setUpdateDescriptionText(category.description);
      console.log(category);
    } catch (error) {
      console.error("Eroare la obtinerea id-ului:", error);
    }
  };
  
  const handleExecuteUpdate = async () => {
    try {
      console.log(updateCategoryId);
      console.log(updateNameText);
    console.log(updateDescriptionText);
      if (!updateCategoryId || !updateNameText || !updateDescriptionText) {
        alert("Completeaza toate campurile pentru update!");
        return;
      }
      console.log(updateCategoryId);
      console.log(updateNameText);
      console.log(updateDescriptionText);
      await updateCategory(updateCategoryId, updateNameText, updateDescriptionText);
  
      const updatedCategories = await getCategories(0, 100,sortOrder);
      setCategories(updatedCategories);
  
      setUpdateCategoryId(null); 
      setUpdateNameText('');
      setUpdateDescriptionText('');
    } catch (error) {
      console.error("Eroare la update:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
console.log(categories.length);
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  return (
    <>
      <br />
      <Container>
      <Form>
    <Row>
      <Col>
        <h3>Enter Category Name:</h3>
        <input
          type="text"
          value={nameText}
          onChange={(e) => setNameText(e.target.value)}
        />
      </Col>
      <Col>
        <h3>Enter Category Description:</h3>
        <input
          type="text"
          value={descriptionText}
          onChange={(e) => setDescriptionText(e.target.value)}
        />
      </Col>
      <Col className="d-flex justify-content-center align-items-center">
        <Button type="button" onClick={handleInsert} className="btn btn-success">
          Save
        </Button>
      </Col>
    </Row>
  </Form>

        <br />
        <br />
        <Form>
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
          </div>
          <div>
            <Button
              type="button"
              onClick={async () => {
                if (!searchTerm) {
                  alert("Completeaza numele categoriei pentru a cauta!");
                  return;
                }

                const categoryId = await getCategoryId(searchTerm);
                console.log(categoryId);
                setSearchedCategoryId(categoryId);
                console.log(searchedCategoryId);

                if (!categoryId) {
                  alert("Nu s-a gasit nicio categorie cu acest nume!");
                  return;
                }

                await handleDelete();
              }}
              className="btn btn-success"
            >
              Delete
            </Button>
          </div>
        </Form>


        <Col className="d-flex justify-content-center align-items-center">
          <Button type="button" onClick={handleSortByClick} className="btn btn-primary sort-by-button">
            Sort By
          </Button>
              </Col>
          {sortByOpen && (

            <div className="sort-by-menu">
              <Button
                onClick={() => {
                  setSortOrder('ASC');
                  fetchData();
                  setSortByOpen(false);
                }}
                className="btn btn-primary"
              >
                Ascending
              </Button>
              <Button
                onClick={() => {
                  setSortOrder('DESC');
                  fetchData();
                  setSortByOpen(false);
                }}
                className="btn btn-primary"
              >
                Descending
              </Button>
            </div>
          )}
        <br />
        <br />
        <br />
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              <th>Update Category</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>
                  <Button
                    onClick={() => handleUpdateButtonClick(c)} 
                    className="btn btn-primary"
                  >
                    Modifica
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

     
        {updateCategoryId !== null && (
          <div>
            <h3>Update Category:</h3>
            <Form.Group>
              <Form.Label>Category Name:</Form.Label>
              <Form.Control
                type="text"
                value={updateNameText}
                onChange={(e) => setUpdateNameText(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={updateDescriptionText}
                onChange={(e) => setUpdateDescriptionText(e.target.value)}
              />
            </Form.Group>
            <Button onClick={handleExecuteUpdate} className="btn btn-success">
              Execute Update
            </Button>
          </div>
        )}

        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </>
  );
};

export default CategoryList;
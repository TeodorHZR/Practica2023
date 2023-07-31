import axios from "axios";

export const getProductsByCategoryId = async (categoryId) => {
    try {
      const response = await axios.get(`https://localhost:7170/api/Products/category/${categoryId}`);
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Eroare la obținerea produselor:", error);
      return [];
    }
  };



  export const updateProduct = async (productId, productName, productPrice, categoryId) => {
    try {
      const response = await axios.put(`https://localhost:7170/api/Products/${productId}`, {
        productName: productName,
        productPrice: productPrice,
        categoryId: categoryId,
      });
      console.log(response.data); 
    } catch (error) {
      console.error("Eroare la actualizarea produsului:", error);
    }
  };

  export const deleteProduct = async (id) => {
    axios.delete(`https://localhost:7170/api/Products/${id}`)
  }
  export const insertProduct = async (productName, productPrice, categoryId) => {
    const response = await axios.post(`https://localhost:7170/api/Products`,{
      productName: productName,
      productPrice: productPrice,
      categoryId: categoryId,
    })
    console.log(response);
  }
  
import axios from "axios";

export const getCategories = async (offset, limit, sortOrder) => {
  const response = await axios.get(`https://localhost:7170/api/Categories/${offset}/${limit}?sortOrder=${sortOrder}`)
  const data = response.data
  console.log(data);
  return data;
}

export const insertCategory = async (categoryName, categoryDescription) => {
  const response = await axios.post(`https://localhost:7170/api/Categories`,{
      Name:categoryName,
      Description:categoryDescription
  })
  console.log(response);
}



export const deleteCategory = async (id) => {
  axios.delete(`https://localhost:7170/api/Categories/${id}`)
}

export const getCategoryId = async (name) =>
{
  const response = await axios.get(`https://localhost:7170/api/Categories/name/${name}`)
  const data = response.data
  console.log(data);
  return data;
}

export const updateCategory = async (categoryId, name, description) => {
  const response = await axios.put(`https://localhost:7170/api/Categories/${categoryId}`, {
    Name: name,
    Description: description,
  });
  console.log(response);
}

export const getCategoriesPaginated = async (page, itemsPerPage, sortOrder) => {
  const response = await axios.get(`https://localhost:7170/api/Categories/paginated?page=${page}&itemsPerPage=${itemsPerPage}&sortOrder=${sortOrder}`);
  const data = response.data;
  console.log(data);
  return data;
};




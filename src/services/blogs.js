import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const like = async (id) => {
  const blogToLike = await getOne(id);
  const newBlog = {
    user: blogToLike.user,
    title: blogToLike.title,
    author: blogToLike.author,
    url: blogToLike.url,
    likes: blogToLike.likes + 1,
  };

  const response = await axios.put(`${baseUrl}/${id}`, newBlog);

  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { setToken, getAll, create, like, deleteBlog };

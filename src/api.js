import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// GET ALL USERS
export const getUsers = () => axios.get(API_URL);

// GET USER BY ID
export const getUserById = (id) => axios.get(`${API_URL}/${id}`);

// CREATE USER
export const createUser = (data) => axios.post(API_URL, data);

// UPDATE USER  (IMPORTANT)
export const updateUser = (id, data) => axios.put(`${API_URL}/${id}`, data);

// DELETE USER
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

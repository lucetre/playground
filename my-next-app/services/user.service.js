import { fetchWrapper } from "helpers";

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api" // development api
    : "https://lucetre.vercel.app/api"; // production api

const baseUrl = `${apiUrl}/users`;

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}

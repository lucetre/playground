import { fetchWrapper } from "helpers";

export const userPostgresService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api" // development api
    : "https://lucetre.herokuapp.com/api"; // production api

function getAll() {
  return fetchWrapper.get(`${apiUrl}/user/all`);
}

function getById(id) {
  return fetchWrapper.get(`${apiUrl}/user?id=${id}`);
}

function create(params) {
  return fetchWrapper.post(`${apiUrl}/user/create`, params);
}

function update(id, params) {
  return fetchWrapper.post(`${apiUrl}/user/update?id=${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${apiUrl}/user?id=${id}`);
}

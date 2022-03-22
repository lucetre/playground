import { fetchWrapper } from "helpers";

export const userBackendService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

const apiUrl = process.env.BACKEND_API;

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

function _delete(id) {
  return fetchWrapper.delete(`${apiUrl}/user?id=${id}`);
}

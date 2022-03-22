import { fetchWrapper } from "helpers";

export const userFrontendService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

const apiUrl = process.env.FRONTEND_API;

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

function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}

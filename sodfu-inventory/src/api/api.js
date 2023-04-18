import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: '/',
  headers: {
    "API-KEY": "6418f527-56fd-4c7d-a109-28133beb7bdd",
  },
});

export const DataAPI = {
  getData() {
    return instance
    .get(`data`)
    .then((responce) => responce.data);
  },
  follow(id) {
    return instance
      .post(`updateData`, { email, password, rememberMe })
      .then((responce) => responce.data);
  },
}
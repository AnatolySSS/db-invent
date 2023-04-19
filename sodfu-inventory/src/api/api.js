import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: '/',
});

export const DataAPI = {
  getData() {
    return instance
    .get(`data`)
    .then((responce) => responce.data);
  },
  follow(id) {
    return instance
      .post(`updateData`)
      .then((responce) => responce.data);
  },
}
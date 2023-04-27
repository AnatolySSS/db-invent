import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: '/',
});

export const DataAPI = {
  async getData(type) {
    const responce = await instance
      .post(`getData`, { type });
    return responce.data;
  },
  async addData(type, rowData, rowId) {
    const responce = await instance
      .post(`addData`, { type, rowData });
    return responce.data;
  },
  async updateData(type, rowData, rowId) {
    const responce = await instance
      .post(`updateData`, { type, rowData, rowId });
    return responce.data;
  },
  async uploadData(type, data) {
    const responce = await instance
      .post(`uploadData`, { type, data });
    return responce.data;
  },
}
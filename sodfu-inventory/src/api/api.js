import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: '/',
});

export const DataAPI = {
  async getData() {
    const responce = await instance
      .get(`data`);
    return responce.data;
  },
  async updateData(rowData, rowId) {
    const responce = await instance
      .post(`updateData`, { rowData, rowId });
    return responce.data;
  },
  async getFurniture() {
    const responce = await instance
      .get(`furniture`);
    return responce.data;
  },
  async updateFurniture(rowData, rowId) {
    const responce = await instance
      .post(`updateFurniture`, { rowData, rowId });
    return responce.data;
  },
}
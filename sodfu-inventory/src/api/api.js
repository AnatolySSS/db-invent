import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: '/',
});

export const DataAPI = {
  async getIt() {
    const responce = await instance
      .get(`getIt`);
    return responce.data;
  },
  async updateIt(rowData, rowId) {
    const responce = await instance
      .post(`updateIt`, { rowData, rowId });
    return responce.data;
  },
  async getFurniture() {
    const responce = await instance
      .get(`getFurniture`);
    return responce.data;
  },
  async updateFurniture(rowData, rowId) {
    const responce = await instance
      .post(`updateFurniture`, { rowData, rowId });
    return responce.data;
  },
  async uploadItData(data) {
    const responce = await instance
      .post(`uploadItData`, { data });
    return responce.data;
  },
}
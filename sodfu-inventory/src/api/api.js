import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: '/',
  // headers: {
  //   "x-access-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImNodXBsaWdpbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NTM2NjU5N30.9ydObqTVMPPKX6PhKBi8PYra1sUcy39TvJJvwaeLeaA',
  // }
});

export const DataAPI = {
  async getData(type, userDivision) {
    const responce = await instance
      .post(`getData`, { type, userDivision });
    return responce.data;
  },
  async addData(type, rowData, userDivision) {
    const responce = await instance
      .post(`addData`, { type, rowData, userDivision });
    return responce.data;
  },
  async updateData(type, rowData, userDivision) {
    const responce = await instance
      .put(`updateData`, { type, rowData, userDivision });
    return responce.data;
  },
  async deleteData(type, rowId, userDivision) {
    const responce = await instance
      .delete(`deleteData`, {data: { type, rowId, userDivision }});
    return responce.data;
  },
  async uploadData(type, data, userDivision) {
    const responce = await instance
      .post(`uploadData`, { type, data, userDivision });
    return responce.data;
  },
}

export const AuthAPI = {
  async me() {
    const responce = await instance
      .get(`auth/me`, {headers: {
        "x-access-token": localStorage.getItem('accessToken'),
      }});
    return responce.data;
  },
  async login(login, password) {
    const responce = await instance
      .post(`auth/login`, { login, password });
    return responce.data;
  },
  async logout() {
    const responce = await instance
      .get(`auth/logout`, {headers: {
        "x-access-token": localStorage.getItem('accessToken'),
      }});
    return responce.data;
  },
}

export const InventoryAPI = {
  async getYears(userDivision) {
    const responce = await instance
      .post(`years`, { userDivision });
    return responce.data;
  },
  async getData(tableName, year, userDivision) {
    const responce = await instance
      .post(`getYearData`, { tableName, year, userDivision });
    return responce.data;
  },
}
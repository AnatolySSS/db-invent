import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "/",
});

export const DataAPI = {
  async getData(type, userAuth) {
    const responce = await instance.post(`getData`, { type, userAuth });
    return responce.data;
  },
  async addData(rowData) {
    const responce = await instance.post(`addData`, { rowData });
    return responce.data;
  },
  async updateData(rowData) {
    const responce = await instance.put(`updateData`, { rowData });
    return responce.data;
  },
  async transferItem(items, transferData) {
    const responce = await instance.put(`transferItem`, { items, transferData });
    return responce.data;
  },
  async deleteData(rowId) {
    const responce = await instance.delete(`deleteData`, { data: { rowId } });
    return responce.data;
  },
  async uploadData(data) {
    const responce = await instance.post(`uploadData`, { data });
    return responce.data;
  },
};

export const AuthAPI = {
  async me() {
    const responce = await instance.get(`auth/me`, {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    });
    return responce.data;
  },
  async login(login, password) {
    const responce = await instance.post(`auth/login`, { login, password });
    return responce.data;
  },
  async logout() {
    const responce = await instance.get(`auth/logout`, {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    });
    return responce.data;
  },
};

export const InventoryAPI = {
  async getYears(userDivision) {
    const responce = await instance.post(`years`, { userDivision });
    return responce.data;
  },
  async beginInventory(type, userDivision) {
    const responce = await instance.post(`beginInventory`, {
      type,
      userDivision,
    });
    return responce.data;
  },
  async requestCurrentInventory(type, userDivision) {
    const responce = await instance.post(`requestCurrentInventory`, {
      type,
      userDivision,
    });
    return responce.data;
  },
  async getData(type, year, userAuth) {
    const responce = await instance.post(`getYearData`, {
      type,
      year,
      userAuth,
    });
    return responce.data;
  },
};

export const UsersAPI = {
  async getUsers(userAuth) {
    const responce = await instance.post(`getUsers`, { userAuth });
    return responce.data;
  },
  async addUser(userData) {
    const responce = await instance.post(`addUser`, { userData });
    return responce.data;
  },
  async updateUser(userData) {
    console.log(userData);

    const responce = await instance.put(`updateUser`, { userData });
    return responce.data;
  },
  async deleteUser(userId) {
    const responce = await instance.delete(`deleteUser`, { data: { userId } });
    return responce.data;
  },
};

export const EmployeesAPI = {
  async downloadEmpoyers() {
    const responce = await instance.get(`downloadEmployees`);
    return responce.data;
  },
  async getEmployees(userAuth) {
    const responce = await instance.post(`getEmployees`, { userAuth });
    return responce.data;
  },
};

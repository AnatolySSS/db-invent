import { EmployersAPI } from "../../../../api/api";
import { requestData } from "../../../../redux/reducers/employers-reducer";

export const getUsers = async () => {
  const adData = await EmployersAPI.downloadEmpoyers();
  requestData();
  console.log(adData);
};

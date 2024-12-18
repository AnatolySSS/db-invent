import { EmployeesAPI } from "../../../../api/api";
import { requestData } from "../../../../redux/reducers/employees-reducer";

export const getUsers = async () => {
  const adData = await EmployeesAPI.downloadEmpoyers();
  requestData();
  console.log(adData);
};

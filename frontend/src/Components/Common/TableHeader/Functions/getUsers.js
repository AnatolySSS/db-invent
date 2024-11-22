import { ADAPI } from "../../../../api/api";
import { requestData } from "../../../../redux/reducers/ad-users-reducer";

export const getUsers = async () => {
  const adData = await ADAPI.getData();
  requestData();
  console.log(adData);
};

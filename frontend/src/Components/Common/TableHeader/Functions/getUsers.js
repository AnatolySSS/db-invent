import { ADAPI } from "../../../../api/api";

export const getUsers = async () => {
  const adData = await ADAPI.getADataD();
  console.log(adData);
};

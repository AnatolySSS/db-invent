import { ADAPI } from "../../api/api";

const SET_DATA = "sodfu-inventory/ad-reducer/SET_DATA";

let initialState = {
  data: [
    {
      cn: "Шиляев Анатолий Николаевич",
      department:
        "Отдел перспективного развития и новых технологий Управления информатизации",
      dn: "",
      mail: "anatoly_shilyaev@mail.ru",
      telephoneNumber: "9200124721",
      title: "Главный эксперт",
    },
  ],
};

const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

const setData = (data) => ({ type: SET_DATA, data });

export const requestData = () => {
  return (dispatch) => {
    ADAPI.getData().then((data) => {
      data.code !== "ECONNREFUSED" && dispatch(setData(data.searchEntries));
    });
  };
};

export default adReducer;

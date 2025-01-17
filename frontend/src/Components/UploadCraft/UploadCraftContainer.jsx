import { connect } from "react-redux";
import { compose } from "redux";
import UploadCraft from "./UploadCraft";
import { uploadData } from "../../redux/reducers/it-data-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {
  return {
    uploadedStatusIt: state.itData.uploadedStatus,
    uploadedStatusFurniture: state.furnitureData.uploadedStatus,
    uploadedStatusUnmarked: state.unmarkedData.uploadedStatus,
    uploadedStatusAssets: state.assetsData.uploadedStatus,
    userAuth: state.auth,
  };
};

let mapDispatchToProps = {
  uploadData,
  setVisible,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthNavigate)(UploadCraft);

import { connect } from "react-redux";
import { compose } from "redux";
import UploadCraft from "./UploadCraft";
import { uploadData as uploadItData } from "../../redux/reducers/it-data-reducer";
import { uploadData as uploadFurnitureData } from "../../redux/reducers/furniture-data-reducer";
import { uploadData as uploadUnmarkedData } from "../../redux/reducers/unmarked-data-reducer";
import { uploadData as uploadAssetsData } from "../../redux/reducers/assets-data-reducer";
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
  uploadItData,
  uploadFurnitureData,
  uploadUnmarkedData,
  uploadAssetsData,
  setVisible,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(UploadCraft);

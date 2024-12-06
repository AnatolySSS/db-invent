import { QRCodeSVG } from "qrcode.react";

export const getImgBodyTemplate =
  (type = "tablerow") =>
  (rowData) => {
    let qrCodeSize, imgSize;
    if (type == "tablerow") {
      qrCodeSize = 65;
      imgSize = 12;
    } else {
      qrCodeSize = 150;
      imgSize = 36;
    }

    const qrCode = (
      <QRCodeSVG
        value={rowData.qr_code}
        size={qrCodeSize}
        level="H"
        bgColor={"#ffffff"}
        fgColor="#008b7c"
        imageSettings={{
          src: require("./../../../../img/logo-big.png"),
          height: imgSize,
          width: imgSize * 1.3,
          opacity: 1,
          excavate: true,
        }}
      />
    );

    return (
      <div className="flex align-items-center justify-content-center">
        {qrCode}
      </div>
    );
  };

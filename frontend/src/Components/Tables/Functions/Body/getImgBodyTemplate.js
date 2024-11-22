import { useRef, useState, useEffect } from "react";
import { Image } from "primereact/image";
import QRCodeStyling from "qr-code-styling";

// const getQrCodeImg = (qr_code, div) => {
//   try {
//     return require(`../../../../img/division_${div}/qr_code/${qr_code}.png`);
//   } catch (error) {
//     return require(`../../../../img/no_data.png`);
//   }
// };

export const getImgBodyTemplate =
  (div, type = "tablerow") =>
  (rowData) => {
    // const [qrCodeImage, setQrCodeImage] = useState(""); // Хранение base64 изображения
    // const ref = useRef(null);
    let qrCodeHeight, qrCodeWidth, id;
    if (type == "tablerow") {
      id = `qrTable_${rowData.id}`;
      qrCodeWidth = 65;
      div == 3 ? (qrCodeHeight = 65) : (qrCodeHeight = 65);
    } else {
      id = `qrDescription_${rowData.id}`;
      qrCodeWidth = 150;
      qrCodeHeight = 150;
    }

    const qrCode = new QRCodeStyling({
      width: 65,
      height: 65,
      type: "png",
      data: rowData.qr_code,
      image: require("./../../../../img/logo-big.png"),
      qrOptions: { mode: "Byte", errorCorrectionLevel: "H" },
      dotsOptions: {
        color: "#008b7c",
        type: "rounded",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
      },
    });

    const divTag = (
      <div id={id} className="flex align-items-center justify-content-center" />
    );
    const element = document.getElementById(id);
    if (id == "qrDescription_1") {
      console.log(id);

      console.log(element);
    }

    // useEffect(() => {
    if (!element?.firstChild) {
      qrCode.append(element);
    }
    // }, []);

    // useEffect(() => {
    //   // Экспорт QR-кода в base64 при монтировании компонента
    //   qrCode.getRawData("png").then((data) => {
    //     const base64Image = URL.createObjectURL(data);
    //   });
    // }, []);

    return divTag;
    // <div className="flex align-items-center justify-content-center" />
    // <Image
    //   src={qrCodeImage}
    //   zoomSrc={qrCodeImage}
    //   alt="No Image"
    //   width={qrCodeWidth}
    //   height={qrCodeHeight}
    //   preview
    // />
  };

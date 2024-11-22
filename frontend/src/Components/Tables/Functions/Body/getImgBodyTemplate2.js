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

export const generateQRCode = (qr_code, elementRef) => {
  const qrCode = new QRCodeStyling({
    width: 65,
    height: 65,
    type: "png",
    data: qr_code,
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

  qrCode.append(elementRef.current);
};

export const generateQRCodef =
  (div, type = "tablerow") =>
  (rowData) => {
    const [qrCodeImage, setQrCodeImage] = useState(""); // Хранение base64 изображения
    // const ref = useRef(null);
    let qrCodeHeight, qrCodeWidth;
    if (type == "tablerow") {
      qrCodeWidth = 65;
      div == 3 ? (qrCodeHeight = 65) : (qrCodeHeight = 65);
    } else {
      qrCodeWidth = 150;
      qrCodeHeight = 150;
    }

    const qrCode = new QRCodeStyling({
      width: 1000,
      height: 1000,
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

    // useEffect(() => {
    //   qrCode.append(ref.current);
    // }, []);

    useEffect(() => {
      // Экспорт QR-кода в base64 при монтировании компонента
      qrCode.getRawData("png").then((data) => {
        const base64Image = URL.createObjectURL(data);
        setQrCodeImage(base64Image); // Сохраняем base64 изображение
      });
    }, []);

    return (
      // <div
      //   className="flex align-items-center justify-content-center"
      //   ref={ref}
      // />
      <Image
        src={qrCodeImage}
        zoomSrc={qrCodeImage}
        alt="No Image"
        width={qrCodeWidth}
        height={qrCodeHeight}
        preview
      />
    );
  };

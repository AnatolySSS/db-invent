import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import { createRoot } from "react-dom/client";
// import { Geometria } from "../assets/fonts/Geometria";
// import { Geometria } from "../assets/fonts/Geometria-Medium";
import { Geometria } from "../assets/fonts/Geometria-Bold";

export async function makeQRCode(selectedItems) {
  let pdf = new jsPDF();
  let y = 8;
  let currentPage = 1;
  let totalCounter = 0;
  let canvasContainers = [];
  let rectWigth = 25;
  let rectHeight = 30;
  let qrCodeWidth = 20;
  let qrCodeHeight = 20;
  let rectQrcodeOffset = (rectWigth - qrCodeWidth) / 2;

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(11);
  pdf.addFileToVFS("Geometria.ttf", Geometria);
  pdf.addFont("Geometria.ttf", "Geometria", "bold");
  pdf.setFont("Geometria", "bold");

  await selectedItems.forEach((item, index) => {
    const qrCode = (
      <QRCodeCanvas
        id={`qrcode_${item.id}`}
        value={item.qr_code}
        size={500}
        level="H"
        bgColor={"#ffffff"}
        fgColor="#008675"
        imageSettings={{
          src: require("./../img/logo-big.png"),
          height: 100,
          width: 100 * 1.3,
          opacity: 1,
          excavate: true,
        }}
      />
    );
    canvasContainers.push(document.createElement("div"));
    const root = createRoot(canvasContainers[index]);
    root.render(qrCode);
  });

  const addImagetoPDF = (img) => {
    let x_start = 8; // отступ слева
    let x_step = rectWigth; // расстояние от левого края одного qr-code до следующего = ширине прямоугольника
    let x = x_start + x_step * ((totalCounter - 1) % 8);

    pdf.roundedRect(x - rectQrcodeOffset, y - rectQrcodeOffset, rectWigth, rectHeight, 1, 1);
    pdf.setFillColor(0, 134, 117);
    pdf.roundedRect(x - rectQrcodeOffset, y - rectQrcodeOffset, rectWigth, rectHeight, 1, 1, "F");
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(x - rectQrcodeOffset + 1, y - rectQrcodeOffset + 1, rectWigth - 2, rectWigth - 2, 1, 1, "F");
    pdf.addImage(img, "png", x, y, qrCodeWidth, qrCodeHeight, "", "MEDIUM");

    //Вычисление левого отступа для центрирования qr-кода
    const textWidth = pdf.getTextWidth(selectedItems[totalCounter - 1].qr_code);
    const text_lm = (rectWigth - textWidth) / 2; // левый отступ

    pdf.text(selectedItems[totalCounter - 1].qr_code, x - rectQrcodeOffset + text_lm, y + rectHeight - 4);
  };

  for (const container of canvasContainers) {
    ++totalCounter;

    let img = container.children[0].toDataURL("image/png");
    addImagetoPDF(img);

    totalCounter % 8 === 0 ? (y += rectHeight) : (y = y);

    if (totalCounter % 72 === 0) {
      pdf.addPage();
      currentPage++;
      pdf.setPage(currentPage);
      y = 8;
    }
  }

  pdf.save("qr_codes.pdf");
}

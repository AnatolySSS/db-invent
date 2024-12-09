import { jsPDF } from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import { createRoot } from "react-dom/client";

export async function makeQRCode(selectedItems) {
  let pdf = new jsPDF();
  let y = 5;
  let currentPage = 1;
  let totalCounter = 0;
  let canvasContainers = [];

  await selectedItems.forEach((item, index) => {
    const qrCode = (
      <QRCodeCanvas
        id={`qrcode_${item.id}`}
        value={item.qr_code}
        size={500}
        level="H"
        bgColor={"#ffffff"}
        fgColor="#008b7c"
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
    let x;
    switch (totalCounter % 8) {
      case 1:
        x = 10;
        break;
      case 2:
        x = 35;
        break;
      case 3:
        x = 60;
        break;
      case 4:
        x = 85;
        break;
      case 5:
        x = 110;
        break;
      case 6:
        x = 135;
        break;
      case 7:
        x = 160;
        break;
      case 0:
        x = 185;
        break;
      default:
        break;
    }

    pdf.addImage(img, "png", x, y, 20, 20, "", "MEDIUM");
    pdf.text(selectedItems[totalCounter - 1].qr_code, x + 1, y + 25);
  };

  for (const container of canvasContainers) {
    ++totalCounter;

    let img = container.children[0].toDataURL("image/png");
    addImagetoPDF(img);

    totalCounter % 8 === 0 ? (y += 28) : (y = y);

    if (totalCounter % 80 === 0) {
      pdf.addPage();
      currentPage++;
      pdf.setPage(currentPage);
      y = 8;
    }
  }
  pdf.save("canvas.pdf");
}

import { jsPDF } from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import { createRoot } from "react-dom/client";

export async function makeQRCode(selectedItems) {
  let pdf = new jsPDF();
  let y = 8;
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
    switch (totalCounter % 4) {
      case 1:
        x = 10;
        break;
      case 2:
        x = 60;
        break;
      case 3:
        x = 110;
        break;
      case 0:
        x = 160;
        break;
      default:
        break;
    }

    pdf.addImage(img, "png", x, y, 40, 40, "", "MEDIUM");
    pdf.text(selectedItems[totalCounter - 1].qr_code, x + 10, y + 45);
  };

  for (const container of canvasContainers) {
    ++totalCounter;

    let img = container.children[0].toDataURL("image/png");
    addImagetoPDF(img);

    totalCounter % 4 === 0 ? (y += 48) : (y = y);

    if (totalCounter % 24 === 0) {
      pdf.addPage();
      currentPage++;
      pdf.setPage(currentPage);
      y = 8;
    }
  }
  pdf.save("canvas.pdf");
}

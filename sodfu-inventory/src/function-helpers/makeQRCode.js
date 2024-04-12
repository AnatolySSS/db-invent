import { jsPDF } from "jspdf"

export function makeQRCode(selectedItems, div) {

    let qrcodes = [];
    let images = []
    let doc = new jsPDF();
    let y = 10
    let x_index = 1
    let currentPage = 1
    let totalCounter = 0
  
    selectedItems.forEach((item) => {
      qrcodes.push(item.qr_code);
    });
  
    const isEven = n => n % 2 == 0
    
    function addImagetoPDF(img) {
      let x
      isEven(x_index) ? x = 100 : x = 10
      doc.addImage(img, "png", x, y, 80, 90, "", "MEDIUM");
      isEven(x_index) ? y+=95 : y = y
      x_index++
    }
  
    const getImgUrl = (qrcode) => {
      try {
        return require(`./../img/${qrcode}.png`)
      } catch (error) {
        return require(`./../img/division_${div}/qr_code/no_data.png`)
      }
    }
  
    qrcodes.map((qrcode, index) => {
      let img_url = getImgUrl(qrcode)
      images[index] = new Image();
      images[index].src = img_url;
    })
  
    let promise = new Promise((resolve, reject) => {
  
      images.forEach((img) => {
        img.onload = () => {
          totalCounter++
          if (x_index > 6) {
            doc.addPage()
            currentPage++
            doc.setPage(currentPage)
            x_index = 1
            y = 10
          }
          addImagetoPDF(img);
          if (totalCounter == qrcodes.length) {
            resolve("result");
          }
        };
      });
    });
  
    promise
    .then(
      result => {
        doc.save("qr_codes.pdf")
      },
      error => {
      }
    );
    
    console.log(qrcodes);
  }
  
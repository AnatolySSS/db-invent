//Формирование Word файла
import { Document, Packer, Paragraph, AlignmentType, LineRuleType, TextRun, Table, TableRow, 
         TableCell, BorderStyle, VerticalAlign, HeightRule, ImageRun, PageNumber, Header, WidthType,
         convertInchesToTwip, UnderlineType } from 'docx'
import { saveAs } from 'file-saver';

export function makeCommitment(selectedItems) {
//   let paragraphs = []
//   for (let i = 0; i < 1000; i++) {
//     paragraphs[i] = ""
//   }
//   let paragraphs_special = []

//   for (let i = 0; i <= all_paragraphs.length; i++) {
//     paragraphs[i] = new Paragraph({ 
//       style: "myCustomStyle", 
//       children: [
//         new TextRun({
//           text: all_paragraphs[i],
//           bold: all_paragraphs[i] == "УСТАНОВИЛ" || 
//                 all_paragraphs[i] == "РЕШИЛ" ||
//                 all_paragraphs[i] == "ОБ УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
//                 all_paragraphs[i] == "ОБ ОТКАЗЕ В УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
//                 all_paragraphs[i] == "О ПРЕКРАЩЕНИИ РАССМОТРЕНИЯ ОБРАЩЕНИЯ" ? true : false,
//           characterSpacing: i == 0 ? 20 : 0,
//         }),
//       ],
//       indent: {
//         firstLine: all_paragraphs[i] == "УСТАНОВИЛ" || 
//                    all_paragraphs[i] == "РЕШИЛ" ||
//                    all_paragraphs[i] == "ОБ УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
//                    all_paragraphs[i] == "ОБ ОТКАЗЕ В УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
//                    all_paragraphs[i] == "О ПРЕКРАЩЕНИИ РАССМОТРЕНИЯ ОБРАЩЕНИЯ" ? 0 : 711,
//       },
//       alignment: all_paragraphs[i] == "УСТАНОВИЛ" || 
//                  all_paragraphs[i] == "РЕШИЛ" ||
//                  all_paragraphs[i] == "ОБ УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
//                  all_paragraphs[i] == "ОБ ОТКАЗЕ В УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
//                  all_paragraphs[i] == "О ПРЕКРАЩЕНИИ РАССМОТРЕНИЯ ОБРАЩЕНИЯ" ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
//       spacing: {
//         line: 357,
//         lineRule: LineRuleType.AUTO,
//         after: all_paragraphs[i] == "УСТАНОВИЛ" || 
//                all_paragraphs[i] == "РЕШИЛ" ||
//                all_paragraphs[i] == "ОБ УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
//                all_paragraphs[i] == "ОБ ОТКАЗЕ В УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
//                all_paragraphs[i] == "О ПРЕКРАЩЕНИИ РАССМОТРЕНИЯ ОБРАЩЕНИЯ" ? 180 : 0,
//         before: all_paragraphs[i] == "УСТАНОВИЛ" ||
//                 all_paragraphs[i] == "РЕШИЛ" ? 180 : 0,
//       },
//     })
//   }

//   paragraphs_special[0] = new Paragraph({ 
//     style: "myCustomStyle", 
//     children: [
//       new TextRun({
//         text: "СЛУЖБА ФИНАНСОВОГО УПОЛНОМОЧЕННОГО",
//         bold: true,
//         size: 28,
//       }),
//     ],
//     alignment: AlignmentType.CENTER,
//     spacing: {
//       after: 180,
//     },
//   })

//   paragraphs_special[1] = new Paragraph({ 
//     style: "myCustomStyle", 
//     children: [
//       new TextRun({
//         text: "РЕШЕНИЕ",
//         bold: true,
//         size: 32,
//         characterSpacing: 95,
//       }),
//     ],
//     alignment: AlignmentType.CENTER,
//   })

//   paragraphs_special[2] = new Paragraph({ 
//     style: "myCustomStyle", 
//     children: [
//       new TextRun({
//         text: paragraphs[0],
//         bold: true,
//         size: 28,
//         characterSpacing: 20,
//       }),
//     ],
//     alignment: AlignmentType.CENTER,
//     spacing: {
//       line: 357,
//       lineRule: LineRuleType.AUTO,
//       after: 180,
//     },
//   })

//   paragraphs_special[3] = new Paragraph({
//     style: "myCustomStyle", 
//     children: [
//       image_fu,
//     ],
//     spacing: {
//       line: 357,
//       lineRule: LineRuleType.AUTO,
//     },
//     alignment: AlignmentType.CENTER,
//   })

//   paragraphs_special[4] = new Paragraph({
//     style: "myCustomStyle", 
//     children: [
//       new TextRun({
//         text: "Podpisant",
//         size: 24,
//         color: "FFFFFF",
//       })
//     ],
//     alignment: AlignmentType.RIGHT,
//   })

//   paragraphs_special[5] = new Paragraph({
//     style: "myCustomStyle", 
//     children: [
//       new TextRun({
//         text: "fu_name",
//         size: 28,
//       })
//     ],
//     alignment: AlignmentType.RIGHT,
//   })

//   paragraphs_special[6] = new Paragraph({
//     style: "myCustomStyle", 
//     children: [
//       new TextRun({
//         text: "Финансовый уполномоченный",
//         size: 28,
//       })
//     ],
//     alignment: AlignmentType.LEFT,
//   })

//   const borders = {
//     top: {
//         style: BorderStyle.NIL,
//         size: 0,
//     },
//     bottom: {
//         style: BorderStyle.NIL,
//         size: 0,
//     },
//     left: {
//         style: BorderStyle.NIL,
//         size: 0,
//     },
//     right: {
//         style: BorderStyle.NIL,
//         size: 0,
//     },
// };

//   const doc = new Document({
//   sections: [
//     { 
//       properties: {
//         page: {
//           pageNumbers: {
//             start: 1,
//           },
//         },
//         titlePage: true,
//       },
//       headers: {
//         default: new Header({
//           children: [
//             new Paragraph({
//               style: "myCustomStyle", 
//               children: [
//                 new TextRun({
//                     children: [PageNumber.CURRENT],
//                 }),
//               ],
//               alignment: AlignmentType.CENTER,
//             }),
//           ],
//         }),
//       },
//       children: [
//         new Table({
//           alignment: AlignmentType.CENTER,
//           rows: [
//             new TableRow({ 
//               children: [
//                 new TableCell({
//                   width: {
//                     size: 100,
//                     type: WidthType.PERCENTAGE,
//                   },
//                   children: [
//                     paragraphs_special[3],
//                     paragraphs_special[0],
//                     paragraphs_special[1],
//                     new Paragraph({
//                       children: [
//                         new TextRun({
//                           text: "",
//                           size: 20,
//                         }),
//                       ],
//                     }),
//                     new Paragraph({
//                       children: [
//                         new TextRun({
//                           text: "",
//                           size: 20,
//                         }),
//                       ],
//                     }),
//                   ],
//                   columnSpan: 2,
//                   borders,
//                 }),
//               ],
//             }),
//             new TableRow({ 
//               width: {
//                 size: 50,
//                 type: WidthType.PERCENTAGE,
//               },
//               children: [
//                 new TableCell({
//                   children: [
//                     new Paragraph({
//                       children: [
//                         new TextRun({
//                           text: "",
//                           size: 24,
//                         }),
//                       ],
//                     }),
//                     new Paragraph({
//                       children: [
//                         new TextRun({
//                           text: "«_____» _______________20____ г.",
//                           size: 24,
//                         }),
//                       ],
//                     }),
//                   ],
//                   borders,
//                 }),
//                 new TableCell({
//                   width: {
//                     size: 50,
//                     type: WidthType.PERCENTAGE,
//                   },
//                   children: [],
//                   borders,
//                 }),
//               ],
//             }),
//             new TableRow({ 
//               children: [
//                 new TableCell({
//                   children: [
//                     new Paragraph({
//                       children: [
//                         new TextRun({
//                           text: "  дата подписания",
//                           size: 20,
//                         }),
//                       ],
//                     }),
//                     new Paragraph({
//                       children: [
//                         new TextRun({
//                           text: "",
//                           size: 24,
//                         }),
//                       ],
//                     }),
//                     new Paragraph({
//                       children: [
//                         new TextRun({
//                           text: "№ ",
//                           size: 24,
//                         }),
//                       ],
//                     }),
//                     new Paragraph({
//                       children: [
//                         new TextRun({
//                           text: "г. Москва",
//                           size: 24,
//                         }),
//                       ],
//                     }),
//                   ],
//                   borders,
//                 }),
//                 new TableCell({
//                   children: [],
//                   borders,
//                 }),
//               ],
//             }),
//           ],
//           width: {
//             size: 100,
//             type: WidthType.PERCENTAGE,
//           },
//           columnWidths: [convertInchesToTwip(8), convertInchesToTwip(8)],
//         }),
//         new Paragraph({
//           style: "myCustomStyle", 
//           children: [
//             new TextRun({
//               text: "",
//               size: 28,
//             }),
//           ],
//           spacing: {
//             before: 180,
//             after: 180,
//           },
//         }),
//         // paragraphs_special[2],
//         paragraphs[0],
//         paragraphs[1],
//         paragraphs[2],
//         paragraphs[3],
//         paragraphs[4],
//         paragraphs[5],
//         paragraphs[6],
//         paragraphs[7],
//         paragraphs[8],
//         paragraphs[9],
//         paragraphs[10],
//         paragraphs[11],
//         paragraphs[12],
//         paragraphs[13],
//         paragraphs[14],
//         paragraphs[15],
//         paragraphs[16],
//         paragraphs[17],
//         paragraphs[18],
//         paragraphs[19],
//         paragraphs[20],
//         paragraphs[21],
//         paragraphs[22],
//         paragraphs[23],
//         paragraphs[24],
//         paragraphs[25],
//         paragraphs[26],
//         paragraphs[27],
//         paragraphs[28],
//         paragraphs[29],
//         paragraphs[30],
//         paragraphs[31],
//         paragraphs[32],
//         paragraphs[33],
//         paragraphs[34],
//         paragraphs[35],
//         paragraphs[36],
//         paragraphs[37],
//         paragraphs[38],
//         paragraphs[39],
//         paragraphs[40],
//         paragraphs[41],
//         paragraphs[42],
//         paragraphs[43],
//         paragraphs[44],
//         paragraphs[45],
//         paragraphs[46],
//         paragraphs[47],
//         paragraphs[48],
//         paragraphs[49],
//         paragraphs[50],
//         paragraphs[51],
//         paragraphs[52],
//         paragraphs[53],
//         paragraphs[54],
//         paragraphs[55],
//         paragraphs[56],
//         paragraphs[57],
//         paragraphs[58],
//         paragraphs[59],
//         paragraphs[60],
//         paragraphs[61],
//         paragraphs[62],
//         paragraphs[63],
//         paragraphs[64],
//         paragraphs[65],
//         paragraphs[66],
//         paragraphs[67],
//         paragraphs[68],
//         paragraphs[69],
//         paragraphs[70],
//         paragraphs[71],
//         paragraphs[72],
//         paragraphs[73],
//         paragraphs[74],
//         paragraphs[75],
//         paragraphs[76],
//         paragraphs[77],
//         paragraphs[78],
//         paragraphs[79],
//         paragraphs[80],
//         paragraphs[81],
//         paragraphs[82],
//         paragraphs[83],
//         paragraphs[84],
//         paragraphs[85],
//         paragraphs[86],
//         paragraphs[87],
//         paragraphs[88],
//         paragraphs[89],
//         paragraphs[90],
//         paragraphs[91],
//         paragraphs[92],
//         paragraphs[93],
//         paragraphs[94],
//         paragraphs[95],
//         paragraphs[96],
//         paragraphs[97],
//         paragraphs[98],
//         paragraphs[99],
//         paragraphs[100],
//         paragraphs[101],
//         paragraphs[102],
//         paragraphs[103],
//         paragraphs[104],
//         paragraphs[105],
//         paragraphs[106],
//         paragraphs[107],
//         paragraphs[108],
//         paragraphs[109],
//         paragraphs[110],
//         paragraphs[111],
//         paragraphs[112],
//         paragraphs[113],
//         paragraphs[114],
//         paragraphs[115],
//         paragraphs[116],
//         paragraphs[117],
//         paragraphs[118],
//         paragraphs[119],
//         paragraphs[120],
//         paragraphs[121],
//         new Paragraph({ 
//           style: "myCustomStyle", 
//           children: [
//             new TextRun({
//               text: "",
//               size: 28,
//             }),
//           ],
//           spacing: {
//             line: 357,
//             lineRule: LineRuleType.AUTO,
//           },
//         }),
//         new Paragraph({ 
//           style: "myCustomStyle", 
//           children: [
//             new TextRun({
//               text: "",
//               size: 28,
//             }),
//           ],
//           spacing: {
//             line: 357,
//             lineRule: LineRuleType.AUTO,
//           },
//         }),
//         new Paragraph({ 
//           style: "myCustomStyle", 
//           children: [
//             new TextRun({
//               text: "",
//               size: 28,
//             }),
//           ],
//           spacing: {
//             line: 357,
//             lineRule: LineRuleType.AUTO,
//           },
//         }),
//         new Table({
//           alignment: AlignmentType.CENTER,
//           rows: [
//             new TableRow({ 
//               children: [
//                 new TableCell({
//                   width: {
//                     size: 33,
//                     type: WidthType.PERCENTAGE,
//                   },
//                   children: [
//                     paragraphs_special[6]
//                   ],
//                   borders,
//                   verticalAlign: VerticalAlign.BOTTOM,
//                 }),
//                 new TableCell({
//                   width: {
//                     size: 33,
//                     type: WidthType.PERCENTAGE,
//                   },
//                   children: [],
//                   borders,
//                 }),
//                 new TableCell({
//                   width: {
//                     size: 33,
//                     type: WidthType.PERCENTAGE,
//                   },
//                   children: [
//                     paragraphs_special[4],
//                     paragraphs_special[5],
//                   ],
//                   borders,
//                   verticalAlign: VerticalAlign.BOTTOM,
//                 }),
//               ],
//               style: {
//                 height: {
//                   rule: HeightRule.AUTO,
//                   value: 1700, 
//                 },
//               }
//             }),
//           ],
//           width: {
//             size: 100,
//             type: WidthType.PERCENTAGE,
//           },
//           columnWidths: [convertInchesToTwip(5), convertInchesToTwip(5), convertInchesToTwip(5)],
//         }),
//       ],
//     },
//   ],
//   styles: 
//     {
//       paragraphStyles: [
//         {
//           id: "myCustomStyle",
//           name: "My Custom Style",
//           basedOn: "Normal",
//           run: {
//             size: 28,
//             font: "Times New Roman",
//           },
//           paragraph: {
//             alignment: AlignmentType.JUSTIFIED
//           },
//         }
//       ]
//     },
//   });

let owners = []
let names = []
selectedItems.forEach(item => {
  owners.push(item.owner)
  names.push(item.name)
});

const borders = {
  top: {
    style: BorderStyle.NIL,
    size: 0,
  },
  bottom: {
    style: BorderStyle.NIL,
    size: 0,
  },
  left: {
    style: BorderStyle.NIL,
    size: 0,
  },
  right: {
    style: BorderStyle.NIL,
    size: 0,
  },
};

const margins = {
  top: convertInchesToTwip(0.05),
  bottom: convertInchesToTwip(0.05),
  right: convertInchesToTwip(0.05),
  left: convertInchesToTwip(0.05),
};

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(0.8),
            right: convertInchesToTwip(0.6),
            bottom: convertInchesToTwip(0.8),
            left: convertInchesToTwip(1.2),
          },
        },
      },
      children: [
        new Table({
          style: "myCustomStyle",
          alignment: AlignmentType.CENTER,
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "ОБЯЗАТЕЛЬСТВО* № _______________",
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  columnSpan: 2,
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [],
                  columnSpan: 2,
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "Я, нижеподписавшийся",
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: owners[0],
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "Дата",
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: new Date().toLocaleString("ru", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }),
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "Управление (отдел, сектор)",
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "Должность",
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "Адрес местонахождения",
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "Служебный телефон",
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                }),
              ],
            }),
          ],
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          margins,
          columnWidths: [convertInchesToTwip(4), convertInchesToTwip(6)],
        }),
        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: `получил(а) от Чуплыгина Сергея Геннадьевича в пользование нижеперечисленное имущество (технику), принадлежащее АНО «СОДФУ» (далее — имущество):`,
            }),
          ],
          alignment: AlignmentType.LEFT,
          spacing: {
            before: 150,
          },
        }),
        new Table({
          style: "myCustomStyle",
          alignment: AlignmentType.CENTER,
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "№ пп",
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "Наименование",
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "Инвентарный №",
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "Заводской №",
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "Кол-во",
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "В каком состоянии принято (исправно, эксплуатируется)",
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
              ],
              height: {
                rule: HeightRule.AUTO,
                value: 1700,
              },
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "1",
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "2",
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "3",
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "4",
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "5",
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "6",
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
              ],
            }),
            ...selectedItems.map((item, index) => {
              return new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [
                          new TextRun({
                            text: `${index + 1}`,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [
                          new TextRun({
                            text: item.name,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [
                          new TextRun({
                            text: "",
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [
                          new TextRun({
                            text: item.serial,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [
                          new TextRun({
                            text: "1",
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [
                          new TextRun({
                            text: "исправно, эксплуатируется",
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
                height: {
                  rule: HeightRule.AUTO,
                  value: 1700,
                },
              });
            }),
          ],
          margins,
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          columnWidths: [
            convertInchesToTwip(0.5),
            convertInchesToTwip(3.5),
            convertInchesToTwip(1.5),
            convertInchesToTwip(1.5),
            convertInchesToTwip(1),
            convertInchesToTwip(2),
          ],
        }),
        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: `С полученным имуществом обязуюсь обращаться аккуратно и бережно.`,
            }),
          ],
          spacing: {
            before: 200,
          },
        }),
        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: `Передавать полученное мною имущество другому лицу не имею права.`,
            }),
          ],
        }),
        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: `В случае повреждения или утраты вышеперечисленного имущества, происшедшего по моей вине, я несу материальную ответственность в соответствии с требованиями статей 238, 248 Трудового Кодекса РФ.`,
            }),
          ],
        }),
        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: `При переходе на другое место работы или увольнения, а также по требованию АНО «СОДФУ» в лице Чуплыгина Сергея Геннадьевича, либо следующих структурных подразделений АНО «СОДФУ», полученное мною имущество обязуюсь возвратить немедленно: Управление информатизации, Административное управление, Отдел безопасности и защиты информации Аппарата АНО «СОДФУ», Отдел по работе с персоналом Аппарата АНО «СОДФУ».`,
            }),
          ],
        }),

        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: `Дополнительные обязательства:`,
              underline: {
                type: UnderlineType.SINGLE,
              },
            }),
          ],
        }),
        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: `1. Обязуюсь самостоятельно не вскрывать имущество, не менять конфигурацию имущества, не устанавливать несанкционированное материальное и программное обеспечение, самостоятельно не изменять настройки материального и программного обеспечения.`,
            }),
          ],
        }),
        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: `2. По вопросам технического обслуживания сообщить в Управление информатизации АНО «СОДФУ» по тел. 77010 (для ИКТ-оборудования) или на Help Desk Управления информатизации, либо хозяйственного отдела Административного управления.`,
            }),
          ],
        }),
        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: `3. При перемещении имущества сообщить по тел. 77010 (для ИКТ-оборудования) и на Help Desk Управления информатизации, либо хозяйственного отдела Административного управления.`,
            }),
          ],
        }),
        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: `4. При передаче имущества другому лицу сообщить по тел. 77010 (для ИКТ-оборудования) и на Help Desk Управления информатизации, либо хозяйственного отдела Административного управления.`,
            }),
          ],
        }),
        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: ``,
            }),
          ],
        }),
        new Table({
          style: "myCustomStyle",
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: owners[0],
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                  borders,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "______________________________",
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  borders,
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "",
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                  borders,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      style: "myCustomStyle",
                      children: [
                        new TextRun({
                          text: "(подпись)",
                          superScript: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  borders,
                }),
              ],
            }),
          ],
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          columnWidths: [convertInchesToTwip(5), convertInchesToTwip(5)],
        }),
        new Paragraph({
          style: "textStyle",
          children: [
            new TextRun({
              text: `«_____» _____________________ 202    г.`,
            }),
          ],
        }),
      ],
    },
  ],
  styles: {
    paragraphStyles: [
      {
        id: "myCustomStyle",
        name: "My Custom Style",
        basedOn: "Normal",
        run: {
          size: 22,
          font: "Times New Roman",
        },
        paragraph: {
          alignment: AlignmentType.JUSTIFIED,
        },
      },
      {
        id: "textStyle",
        name: "textStyle",
        basedOn: "Normal",
        run: {
          size: 22,
          font: "Times New Roman",
        },
        paragraph: {
          alignment: AlignmentType.JUSTIFIED,
          spacing: {
            after: 150,
            line: 300,
            lineRule: LineRuleType.AUTO,
          },
        },
      },
    ],
  },
});

  Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Обязательство ${owners[0]}.docx`);
  });
}
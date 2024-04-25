//Формирование Word файла
import {
  Document,
  Packer,
  Paragraph,
  AlignmentType,
  LineRuleType,
  TextRun,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  VerticalAlign,
  HeightRule,
  WidthType,
  convertInchesToTwip,
  UnderlineType,
  Footer,
  TabStopType,
} from "docx";
import { inclineFirstname, inclineMiddlename, inclineLastname } from "lvovich";
import { saveAs } from "file-saver";

export function makeCommitment(selectedItems, fullName) {

  let owners = [];
  let names = [];
  selectedItems.forEach((item) => {
    owners.push(item.owner);
    names.push(item.name);
  });

  const zeroBorders = {
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

  const bottomBorder = {
    top: {
      style: BorderStyle.NIL,
      size: 0,
    },
    bottom: {
      style: BorderStyle.SINGLE,
      size: 1,
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
              left: convertInchesToTwip(0.6),
            },
          },
          titlePage: true,
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                style: "myCustomStyle",
                children: [
                  new TextRun({
                    text: "________________________________________",
                  }),
                ],
                spacing: {
                  after: 150,
                  line: 300,
                  lineRule: LineRuleType.AUTO,
                },
              }),
              new Paragraph({
                style: "myCustomStyle",
                children: [
                  new TextRun({
                    text: "1 ",
                    superScript: true,
                    italics: true,
                  }),
                  new TextRun({
                    text: " Распечатывается на одном листе с оборотом.",
                    italics: true,
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            style: "myCustomStyle",
            children: [
              new TextRun({
                text: `\tПриложение`,
              }),
            ],
            tabStops: [
              {
                type: TabStopType.LEFT,
                position: 7200,
              },
            ],
            spacing: {
              after: 10,
              line: 300,
              lineRule: LineRuleType.AUTO,
            },
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            style: "myCustomStyle",
            children: [
              new TextRun({
                text: `\tк приказу АНО «СОДФУ»`,
              }),
            ],
            tabStops: [
              {
                type: TabStopType.LEFT,
                position: 7200,
              },
            ],
            spacing: {
              after: 10,
              line: 300,
              lineRule: LineRuleType.AUTO,
            },
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            style: "myCustomStyle",
            children: [
              new TextRun({
                text: `\tот 17.02.2021 № ОД-2102173`,
              }),
            ],
            tabStops: [
              {
                type: TabStopType.LEFT,
                position: 7200,
              },
            ],
            spacing: {
              after: 250,
              line: 300,
              lineRule: LineRuleType.AUTO,
            },
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            style: "myCustomStyle",
            children: [
              new TextRun({
                text: "ОБЯЗАТЕЛЬСТВО*",
                bold: true,
              }),
              new TextRun({
                text: "1",
                superScript: true,
                bold: true,
              }),
              new TextRun({
                text: " № _______________",
                bold: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 450,
            },
          }),
          new Table({
            style: "myCustomStyle",
            alignment: AlignmentType.CENTER,
            rows: [
              // new TableRow({
              //   children: [
              //     new TableCell({
              //       children: [
              //         new Paragraph({
              //           style: "myCustomStyle",
              //           children: [
              //             new TextRun({
              //               text: "ОБЯЗАТЕЛЬСТВО*",
              //               bold: true,
              //             }),
              //             new TextRun({
              //               text: "1",
              //               superScript: true,
              //               bold: true,
              //             }),
              //             new TextRun({
              //               text: " № _______________",
              //               bold: true,
              //             }),
              //           ],
              //           alignment: AlignmentType.CENTER,
              //         }),
              //       ],
              //       columnSpan: 2,
              //     }),
              //   ],
              // }),
              // new TableRow({
              //   children: [
              //     new TableCell({
              //       children: [],
              //       columnSpan: 2,
              //     }),
              //   ],
              // }),
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
                    width: {
                      size: convertInchesToTwip(2.2),
                      type: WidthType.DXA,
                    },
                    borders: zeroBorders,
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
                    borders: bottomBorder,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [],
                    borders: zeroBorders,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [
                          new TextRun({
                            text: "ФИО полностью",
                            style: "myCustomStyle",
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    borders: zeroBorders,
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
                    borders: zeroBorders,
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
                    borders: bottomBorder,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [],
                        alignment: AlignmentType.LEFT,
                      }),
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
                    borders: zeroBorders,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    borders: bottomBorder,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [],
                        alignment: AlignmentType.LEFT,
                      }),
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
                    borders: zeroBorders,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    borders: bottomBorder,
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
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [
                          new TextRun({
                            text: "(дистанционное место работы)",
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    borders: zeroBorders,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    borders: bottomBorder,
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
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [
                          new TextRun({
                            text: "(мобильный телефон)",
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    borders: zeroBorders,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "myCustomStyle",
                        children: [],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    borders: bottomBorder,
                  }),
                ],
              }),
            ],
            margins,
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            // columnWidths: [convertInchesToTwip(4), convertInchesToTwip(6)],
          }),
          new Paragraph({
            style: "textStyle",
            children: [
              new TextRun({
                text: `получил(а) от ${inclineLastname(
                  fullName.split(" ")[0],
                  "genitive"
                )} ${inclineFirstname(
                  fullName.split(" ")[1],
                  "genitive"
                )} ${inclineMiddlename(
                  fullName.split(" ")[2],
                  "genitive"
                )} в пользование нижеперечисленное имущество (технику), принадлежащее АНО «СОДФУ» (далее — имущество):`,
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
              convertInchesToTwip(0.5),
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
                text: `При переходе на другое место работы или увольнения, а также по требованию АНО «СОДФУ» в лице ${inclineLastname(
                  fullName.split(" ")[0],
                  "genitive"
                )} ${inclineFirstname(
                  fullName.split(" ")[1],
                  "genitive"
                )} ${inclineMiddlename(
                  fullName.split(" ")[2],
                  "genitive"
                )}, либо следующих структурных подразделений АНО «СОДФУ», полученное мною имущество обязуюсь возвратить немедленно: Управление информатизации, Административное управление, Отдел безопасности и защиты информации Аппарата АНО «СОДФУ», Отдел по работе с персоналом Аппарата АНО «СОДФУ».`,
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
                    borders: zeroBorders,
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
                    borders: zeroBorders,
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
                    borders: zeroBorders,
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
                    borders: zeroBorders,
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
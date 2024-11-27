import ActiveDirectory from "activedirectory2";
import { Client } from "ldapts";

let config = {
  url: "ldap://10.205.0.11:389",
  bindDN: "cn=gitlab,cn=Users,dc=sfurf,dc=office",
  password: "Pdfi#1khgg",
};

export const ADController = {
  async getADData(request, responce) {
    const client = new Client({
      url: config.url,
    });
    try {
      await client.bind(config.bindDN, config.password);
      console.log("Успешно подключились к LDAP-серверу");

      const opts = {
        sizeLimit: 1000,
        scope: "sub",
        filter: "(&(objectClass=person)(title=*))",
        attributes: [
          "cn",
          "telephoneNumber",
          "mail",
          "mailNickname",
          "department",
          "title",
          "objectGUID",
          "objectSid",
        ],
      };

      let { searchEntries } = await client.search("dc=sfurf,dc=office", opts);

      console.log(searchEntries);

      searchEntries = searchEntries.map((entry) => {
        return { ...entry, objectSid2: sidToString(entry.objectSid) };
      });

      responce.json({ searchEntries });
    } catch (error) {
      console.log("__________ADController__getADData___________");
      console.log(error);
      responce.json(error);
    } finally {
      await client.unbind();
      console.log("Соединение закрыто");
    }
  },
  async getADData2(request, responce) {
    try {
      let config = {
        url: "ldap://10.205.0.11:389",
        baseDN: "cn=gitlab,cn=Users,dc=sfurf,dc=office",
        username: "gitlab@sfurf.office",
        password: "Pdfi#1khgg",
      };
      let ad = new ActiveDirectory(config);
      ad.find("cn=*Exchange*", (err, results) => {
        if (err || !results) {
          console.log("ERROR: " + JSON.stringify(err));
          return;
        }
        console.log(results);
        responce.json({ ad });
      });
    } catch (error) {
      console.log("__________ADController__getADData___________");
      console.log(error);
      responce.json(error);
    }
  },
};

const sidToString = (base64) => {
  //Конвертируем строку base64 в Buffer, а потом его преобразуем в HEX
  const buffer = Buffer.from(base64, "base64");
  const array = buffer.toString("hex"); //010500000000000515000000e967bb98d6b7d7bf82051e6c28060000
  const G = array.toString().match(/.{1,2}/g);

  /* G array
    [
      '01', '05', '00', '00', '00',
      '00', '00', '05', '15', '00',
      '00', '00', 'e9', '67', 'bb',
      '98', 'd6', 'b7', 'd7', 'bf',
      '82', '05', '1e', '6c', '28',
      '06', '00', '00'
    ]
    */

  const BESA2 = `${G[8]}${G[9]}${G[10]}${G[11]}`;
  const BESA3 = `${G[12]}${G[13]}${G[14]}${G[15]}`;
  const BESA4 = `${G[16]}${G[17]}${G[18]}${G[19]}`;
  const BESA5 = `${G[20]}${G[21]}${G[22]}${G[23]}`;
  const BERID = `${G[24]}${G[25]}${G[26]}${G[27]}`;
  const LESA1 = `${G[2]}${G[3]}${G[4]}${G[5]}${G[6]}${G[7]}`;

  const LESA2 = `${BESA2.substr(6, 2)}${BESA2.substr(4, 2)}${BESA2.substr(
    2,
    2
  )}${BESA2.substr(0, 2)}`;
  const LESA3 = `${BESA3.substr(6, 2)}${BESA3.substr(4, 2)}${BESA3.substr(
    2,
    2
  )}${BESA3.substr(0, 2)}`;
  const LESA4 = `${BESA4.substr(6, 2)}${BESA4.substr(4, 2)}${BESA4.substr(
    2,
    2
  )}${BESA4.substr(0, 2)}`;
  const LESA5 = `${BESA5.substr(6, 2)}${BESA5.substr(4, 2)}${BESA5.substr(
    2,
    2
  )}${BESA5.substr(0, 2)}`;
  const LERID = `${BERID.substr(6, 2)}${BERID.substr(4, 2)}${BERID.substr(
    2,
    2
  )}${BERID.substr(0, 2)}`;

  const LE_SID_HEX = `${LESA1}-${LESA2}-${LESA3}-${LESA4}-${LESA5}-${LERID}`;

  const ADDR = LE_SID_HEX.split("-");

  const SID = "S-1-" + ADDR.map((x) => parseInt(x, 16)).join("-");
  return SID;
};

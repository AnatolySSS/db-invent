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

      searchEntries = searchEntries.map((entry) => {
        return { ...entry, objectSid: decodeObjectSid(entry.objectSid) };
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

function decodeObjectSid(buffer) {
  let sid = "S-";
  // Первый байт — это версия
  sid += buffer[0].toString();
  // Следующие 6 байтов — это идентификатор органа (Authority ID)
  sid += "-" + buffer.readUIntBE(2, 6).toString();
  // Оставшиеся байты — это идентификаторы под-авторитетов (Sub-authorities)
  const subAuthorityCount = buffer[1];
  for (let i = 0; i < subAuthorityCount; i++) {
    sid += "-" + buffer.readUInt32LE(8 + i * 4).toString();
  }
  return sid;
}

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
        return { ...entry, objectSid: decodeSID(entry.objectSid) };
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

function decodeSID(sid) {
  const strSid = ["S"];

  // Первый байт (byte[0]) — это уровень ревизии (revision level)
  const revision = sid[0];
  strSid.push(revision.toString());

  // Второй байт (byte[1]) — количество под-идентификаторов (sub-authorities)
  const countSubAuths = sid[1] & 0xff;

  // Байты с 2 по 7 (byte[2-7]) — это 48-битный идентификатор органа (authority ID, Big-Endian)
  let authority = 0n; // Используем BigInt для работы с большими числами
  for (let i = 2; i <= 7; i++) {
    authority |= BigInt(sid[i]) << BigInt(8 * (5 - (i - 2)));
  }
  strSid.push(authority.toString(10)); // Преобразуем authority в строку в десятичной системе

  // Байты, следующие за authority, — это идентификаторы под-органов (sub-authorities, Little-Endian)
  let offset = 8;
  const size = 4; // Каждый под-идентификатор занимает 4 байта
  for (let j = 0; j < countSubAuths; j++) {
    let subAuthority = 0;
    for (let k = 0; k < size; k++) {
      subAuthority |= (sid[offset + k] & 0xff) << (8 * k); // Little-Endian
    }
    strSid.push(subAuthority.toString(10)); // Добавляем значение subAuthority в строку
    offset += size;
  }

  // Возвращаем строку SID в формате "S-1-..."
  return strSid.join("-");
}

// Пример использования:
const sid = Buffer.from([
  1, 5, 0, 0, 0, 0, 0, 5, 21, 0, 0, 0, 255, 255, 255, 255, 1, 0, 0, 0, 44, 0, 0,
  0,
]);
console.log(decodeSID(sid));
// Вывод: "S-1-5-21-4294967295-1-44"

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
  const strSid = new StringBuilder("S-");

  // get byte(0) - revision level
  const revision = sid[0];
  strSid.append(revision);

  //next byte byte(1) - count of sub-authorities
  const countSubAuths = sid[1] & 0xff;
  strSid.append("-");

  //byte(2-7) - 48 bit authority ([Big-Endian])
  let authority = 0;
  for (let i = 2; i <= 7; i++) {
    authority |= (sid[i] & 0xff) << (8 * (5 - (i - 2)));
  }
  strSid.append(authority.toString(16));

  //iterate all the sub-auths and then countSubAuths x 32 bit sub authorities ([Little-Endian])
  let offset = 8;
  let size = 4;
  for (let j = 0; j < countSubAuths; j++) {
    let subAuthority = 0;
    for (let k = 0; k < size; k++) {
      subAuthority |= (sid[offset + k] & 0xff) << (8 * k);
    }
    strSid.append("-");
    strSid.append(subAuthority.toString(16));
    offset += size;
  }

  return strSid.toString();
}

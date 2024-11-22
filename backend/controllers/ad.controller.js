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
        sizeLimit: 9000,
        scope: "sub",
        filter: "objectClass=person",
        attributes: [
          "cn",
          "telephoneNumber",
          "mail",
          "department",
          "title",
          "objectclass",
        ],
      };

      const { searchEntries } = await client.search("dc=sfurf,dc=office", opts);

      let entries = [];
      //   for await (const entry of searchEntries) {
      //     if (entry.cn.length !== 0) {
      //       entries.push(entry);
      //     }
      //   }

      //   console.log("Результаты поиска:", searchResult);

      //   console.log(searchEntries);

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

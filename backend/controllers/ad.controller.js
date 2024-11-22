import ActiveDirectory from "activedirectory2";
import { Client } from "ldapts";

let config = {
  url: "ldap://10.205.0.11:389",
  bindDN: "cn=gitlab,cn=Users,dc=sfurf,dc=office",
  username: "gitlab@sfurf.office",
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
        filter: "(objectClass=*)",
        // attributes: ["cn", "sn", "mail", "sAMAccountName"],
      };

      const searchResult = await client.search(
        "ou=User,dc=sfurf,dc=office",
        opts
      );

      //   for await (const entry of searchResult.entries) {
      //     entries.push({
      //       cn: entry.attributes.cn ? entry.attributes.cn[0] : null,
      //       sn: entry.attributes.sn ? entry.attributes.sn[0] : null,
      //       mail: entry.attributes.mail ? entry.attributes.mail[0] : null,
      //       sAMAccountName: entry.attributes.sAMAccountName
      //         ? entry.attributes.sAMAccountName[0]
      //         : null,
      //       dn: entry.dn,
      //     });
      //   }

      //   console.log("Результаты поиска:", searchResult);

      //   const { searchEntries, searchReferences } = await client.search(
      //     "dc=sfurf,dc=office",
      //     opts
      //   );

      //   console.log(searchEntries);

      responce.json({ searchResult });
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

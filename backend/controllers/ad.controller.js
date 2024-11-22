import ActiveDirectory from "activedirectory2";
import { Client } from "ldapts";

export const ADController = {
  async getADData(request, responce) {
    try {
      let config = {
        url: "ldap://10.205.0.11:389",
        bindDN: "cn=gitlab,cn=Users,dc=sfurf,dc=office",
        username: "gitlab@sfurf.office",
        password: "Pdfi#1khgg",
      };
      const client = new Client({
        url: config.url,
      });

      await client.bind(config.bindDN, config.password);

      const { searchEntries, searchReferences } = await client.search(
        "dc=sfurf,dc=office",
        {
          scope: "sub",
          //   filter: "(mail=peter.parker@marvel.com)",
        }
      );

      console.log(searchEntries);

      responce.json({ searchEntries, searchReferences });
    } catch (error) {
      console.log("__________ADController__getADData___________");
      console.log(error);
      responce.json(error);
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

import config from "../../config";

export  const getToken=()=> {
    var bodyJson = {
      client_id: config.clientId,
      client_secret: config.secret,
      audience: config.audienceV2,
      grant_type: config.grantType,
    };
    var request = require("request");
    return new Promise(function (resolve, reject) {
      var options = {
        method: "POST",
        url: "https://dev-bn2ia9lj.us.auth0.com/oauth/token",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bodyJson),
      };
      request(options, function (error: any, response: any, body: any) {
        if (error) reject(error);
        else resolve(JSON.parse(body).access_token);
      });
    });
  }
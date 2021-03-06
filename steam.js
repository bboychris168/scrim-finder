const querystring = require("querystring");
const request = require("request");
const config = require("./config");

function getApiEndpoint(inf, method, version) {
  const host = "http://api.steampowered.com";
  return `${host}/${inf}/${method}/${version}`;
}

module.exports = {
  /**
   * Gets data about a Steam user
   * @param steamId
   * @returns {Promise<any>}
   */
  getPlayerSummary: function (steamId) {
    return new Promise((resolve, reject) => {
      // Get API key
      const key = config.steamApiKey;
      if (!key || key.length < 1) {
        reject("Steam API key missing");
      }

      // Get Steam API URL
      const endpoint = getApiEndpoint(
        "ISteamUser",
        "GetPlayerSummaries",
        "v0002"
      );
      const URL =
        endpoint +
        "/?" +
        querystring.encode({
          key,
          steamids: steamId,
        });

      // Make request and parse response
      request(URL, (err, res, body) => {
        if (err) {
          reject(err);
        } else if (res.statusCode !== 200) {
          reject("Steam API request failed (" + res.statusCode + "): " + body);
        } else {
          const json = JSON.parse(body);
          resolve(json.response.players[0]);
        }
      });
    });
  },
};

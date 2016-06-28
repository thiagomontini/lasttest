var restful = require("restful.js").default;
var fetchBackend = require("restful.js").fetchBackend;
var config = require("../config.js");

module.exports = restful(config.apiUrl, fetchBackend(fetch));

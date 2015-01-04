"use strict";

var crypto = require("crypto");
var Promise = require("bluebird");
var DOMAIN = "https://staging.anypay.io";
var superagent = require("superagent");
var http = Promise.promisifyAll(superagent);

var Client = function Client(options) {
  this.accessKeyId = options.accessKeyId;
  this.secretAccessKey = options.secretAccessKey;
};

Client.prototype.createInvoice = function (options) {
  return http.post(DOMAIN + "/api/invoices").auth(this.accessKeyId, this.sign(options)).send(options).endAsync();
};

Client.prototype.sign = function (json) {
  var body = JSON.stringify(json);
  var signature = crypto.createHmac("sha256", this.secretAccessKey).update(body).digest("hex");
  return signature;
};

module.exports = Client;
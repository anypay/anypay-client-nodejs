"use strict";

var crypto = require("crypto");
var Promise = require("bluebird");
var DOMAIN = "https://anypay.io";
var superagent = require("superagent");
var http = Promise.promisifyAll(superagent);

var Client = function Client(options) {
  this.accessKeyId = options.accessKeyId;
  this.secretAccessKey = options.secretAccessKey;
  this.domain = options.domain || DOMAIN;
};

Client.prototype.createInvoice = function (options) {
  return http.post(this.domain + "/api/invoices").auth(this.accessKeyId, this.sign(options)).set("Accept", "application/json").set("Access-Control-Allow-Origin", "*").withCredentials().send(options).endAsync();
};

Client.prototype.registerMerchant = function (options) {
  return http.post(this.domain + "/api/merchants").set("Accept", "application/json").set("Access-Control-Allow-Origin", "*").send(options).endAsync();
};

Client.prototype.sign = function (json) {
  var body = JSON.stringify(json);
  var signature = crypto.createHmac("sha256", this.secretAccessKey).update(body).digest("hex");
  return signature;
};

module.exports = Client;
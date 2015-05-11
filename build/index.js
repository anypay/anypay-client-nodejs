"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var crypto = require("crypto");
var Promise = require("bluebird");
var DOMAIN = "https://api.anypay.io";
var superagent = require("superagent");
var http = Promise.promisifyAll(superagent);

var Client = (function () {
  function Client(options) {
    this.accessKeyId = options.accessKeyId;
    this.secretAccessKey = options.secretAccessKey;
    this.domain = options.domain || DOMAIN;
  }

  _prototypeProperties(Client, null, {
    createInvoice: {
      value: function createInvoice(options) {
        return http.post(this.domain + "/invoices").auth(this.accessKeyId, this.sign(options)).set("Accept", "application/json").set("Access-Control-Allow-Origin", "*")
        //.withCredentials()
        .send(options).endAsync();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    registerMerchant: {
      value: function registerMerchant(options) {
        return http.post(this.domain + "/merchants").set("Accept", "application/json").set("Access-Control-Allow-Origin", "*").send(options).endAsync();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    sign: {
      value: function sign(json) {
        var body = JSON.stringify(json);
        var signature = crypto.createHmac("sha256", this.secretAccessKey).update(body).digest("hex");
        return signature;
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Client;
})();

module.exports = Client;
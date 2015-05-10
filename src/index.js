var crypto     = require('crypto')
var Promise    = require('bluebird')
var DOMAIN     = 'https://anypay.io'
var superagent = require('superagent')
var http       = Promise.promisifyAll(superagent)

class Client {

  constructor(options) {
    this.accessKeyId     = options.accessKeyId
    this.secretAccessKey = options.secretAccessKey
    this.domain          = options.domain || DOMAIN
  }

  createInvoice(options) {
    return http
      .post(this.domain+'/invoices')
      .auth(this.accessKeyId, this.sign(options))
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .withCredentials()
      .send(options)
      .endAsync()
  }

  registerMerchant(options) {
    return http
      .post(this.domain+'/merchants')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .send(options)
      .endAsync()
  }

  sign(json) {
    var body = JSON.stringify(json)
    var signature = crypto.createHmac('sha256', this.secretAccessKey).update(body).digest('hex')
    return signature
  }
}

module.exports = Client


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
      .post(this.domain+'/api/invoices')
      .auth(this.accessKeyId, this.sign(options))
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


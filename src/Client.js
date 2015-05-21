import crypto from 'crypto'
import superagent from 'superagent'
import bb from 'bluebird'
import { DOMAIN } from '../config'

const http = bb.promisifyAll(superagent)

export default class Client {

  constructor(options) {

    if (options.accessKeyId === undefined || options.secretAccessKey === undefined) {
        throw new Error('Anypay client requires API keys to make calls')
    }

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
      //.withCredentials()
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
    const body = JSON.stringify(json)
    return crypto.createHmac('sha256', this.secretAccessKey).update(body).digest('hex')
  }
}


'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../config');

var http = _bluebird2['default'].promisifyAll(_superagent2['default']);

var Client = (function () {
  function Client(options) {
    _classCallCheck(this, Client);

    if (options.accessKeyId === undefined || options.secretAccessKey === undefined) {
      throw new Error('Anypay client requires API keys to make calls');
    }

    this.accessKeyId = options.accessKeyId;
    this.secretAccessKey = options.secretAccessKey;
    this.domain = options.domain || _config.DOMAIN;
  }

  _createClass(Client, [{
    key: 'createInvoice',
    value: function createInvoice(options) {
      return http.post(this.domain + '/invoices').auth(this.accessKeyId, this.sign(options)).set('Accept', 'application/json').set('Access-Control-Allow-Origin', '*')
      //.withCredentials()
      .send(options).endAsync();
    }
  }, {
    key: 'registerMerchant',
    value: function registerMerchant(options) {
      return http.post(this.domain + '/merchants').set('Accept', 'application/json').set('Access-Control-Allow-Origin', '*').send(options).endAsync();
    }
  }, {
    key: 'sign',
    value: function sign(json) {
      var body = JSON.stringify(json);
      return _crypto2['default'].createHmac('sha256', this.secretAccessKey).update(body).digest('hex');
    }
  }]);

  return Client;
})();

exports['default'] = Client;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Client2 = require('./Client');

var _Client3 = _interopRequireDefault(_Client2);

exports.Client = _Client3['default'];

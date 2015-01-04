var path         = require('path');
var AnypayClient = require(path.join(__dirname, '/../'));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var client = new AnypayClient({
  accessKeyId     : '146c3c8a5f233d6b8d4b5f31e132efa68b21b9b19478096208b66f655e377b50',
  secretAccessKey : '3c14678349de9ad8d25c6d10c00bc86963eac63b0ab78e5b4a17f0143f34af51'
});

client.createInvoice({
  amount: '10',
  currency: 'XAG',
  issuer: 'rEkdwFbpp5YKRJAQQkCKED1zEPtCzm7oC4'
})
.then(function(response) {
  console.log('response', response.body);
})
.error(function(error) {
  console.log('error', error);
});


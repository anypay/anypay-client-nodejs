var path         = require('path');
var AnypayClient = require(path.join(__dirname, '/../'));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var client = new AnypayClient({
  accessKeyId     : process.env['ANYPAY_CLIENT_ID'],
  secretAccessKey : process.env['ANYPAY_CLIENT_SECRET']
});

client.createInvoice({
  amount: '10',
  currency: 'XRP'
})
.then(function(response) {
  console.log(response)
  console.log('response', response.body);
})
.error(function(error) {
  console.log('error', error);
});


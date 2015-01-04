# Anypay Client

Node.js Client for generating invoices using the Anypay.io API

## Installation

    npm install --save anypay-client

## Usage

    var client = new Anypay.Client({
      accessKeyId     : 'd474b25616d9205e4159448e93ba54f0da361697be0c1c7f0eb8c8023c575918',
      secretAccessKey : '4642f17b772f245cbe276d5d240e669d4a6d138919471171d57f4a612601f307'
    })
    
    // Api calls return a Promise 

    client.createInvoice({
      amount: '10',
      currency: 'XAG',
      issuer: 'rEkdwFbpp5YKRJAQQkCKED1zEPtCzm7oC4'
    })
    .then(function(invoice) {})
    .error(function(error) {})


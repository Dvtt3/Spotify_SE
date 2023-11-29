const http = require('http');
const https = require('https');

module.exports = (req, res) => {
  console.log("Sono nel server");
      res
        .status(200)
        .set('Content-Type', 'application/transit+json')
        .send(JSON.stringify({ data: "richiesta effettuata" }))
        .end();

};
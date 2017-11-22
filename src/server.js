import App from "./App";
import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";

const bodyParser = require('body-parser');
const { Client } = require('pg');
const twilio = require('twilio');
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const pgClient = new Client({ssl: true});
const TWILIO_ACCOUNT_SID = process.env.RAZZLE_TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.RAZZLE_TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = process.env.RAZZLE_TWILIO_NUMBER;
console.log(process.env);
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const startPgClient = async () => {
  await pgClient.connect();
}
startPgClient();



const findUserByNumberQuery = (num) => ({
  name: 'fetch-breezer',
  text: 'SELECT * FROM breezers WHERE phone = $1',
  values: [num]
});

const sendSms = (num, res, msg) => {
  twilioClient.messages.create({
    to: num,
    from: TWILIO_NUMBER,
    body: msg
  }, function(err, data) {
    res.send('Message is inbound!');
  });
}

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .post('/api/text', (req, postRes) => {
    pgClient.query(findUserByNumberQuery(req.param('from'))).then(res => {
      var message = res.rows.length ? 'Welcome to Brze! Please check back soon for beta!' : 'Welcome to Brze! Please register an account at brze.io and check back for beta!';
      sendSms(req.param('from'), postRes,  message);
    });
  })
  .post('/api/signup', (req, postRes) => {
    pgClient.query(findUserByNumberQuery(req.body.phone))
      .then(res => {
        if(!res.rows.length){
          const query = {
            name: 'write-breezer',
            text: 'INSERT INTO breezers (phone, name, address, addressoptional, zip, email, city, password, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            values: [req.body.phone, req.body.name, req.body.address, req.body.addressoptional, req.body.zip, req.body.email, req.body.city, req.body.password, req.body.state]
          }
          pgClient.query(query).then(res => {
            console.log("see if phone is correct", req.body);
            sendSms(req.body.phone, postRes, 'Welcome to Brze! Please check back soon for beta!');
          }).catch(e => console.log("Write Failure", e))
        } else {
          postRes.send("This number is already signed up!");
        }
      })
      .catch(e => console.error("Sign Up Failure", e));
  })
  .get("/*", (req, res) => {
    const markup = renderToString(<App />);
    res.send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Razz a mataz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ""}
         ${process.env.NODE_ENV === "production"
           ? `<script src="${assets.client.js}" defer></script>`
           : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
    );
  });

export default server;

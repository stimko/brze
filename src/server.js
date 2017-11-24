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
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const startPgClient = async () => {
  try{
    let response = await pgClient.connect();
  } catch (e){
    console.log(e);
  }
}
startPgClient();

const findUserByNumberQuery = (num) => ({
  name: 'fetch-breezer',
  text: 'SELECT * FROM breezers WHERE phone = $1',
  values: [num]
});

const sendSms = (num, res, msg, responseMessage="Success!") => {
  twilioClient.messages.create({
    to: num,
    from: TWILIO_NUMBER,
    body: msg
  }, function(err, data) {
    res.send(responseMessage);
  });
}

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .post('/api/text', (req, postRes) => {
    const fromNumber = req.body.From.replace('+', '');
    pgClient.query(findUserByNumberQuery(fromNumber)).then(res => {
      var message = res.rows.length ? 'Welcome to Brze! Please check back soon for beta!' : 'Welcome to Brze! Please register an account at brze.io and check back for beta!';
      sendSms(fromNumber, postRes,  message);
    });
  })
  .post('/api/signup', (req, postRes) => {
    let phoneNumber;
    try {
      phoneNumber = req.body.phone.replace(/\D/g, '');
      const isValid10 = phoneNumber.match(/^\d{10}$/g) ? !!phoneNumber.match(/^\d{10}$/g).length : false;
      const isValid11 = phoneNumber.match(/^1\d{10}$/g) ? !!phoneNumber.match(/^1\d{10}$/g).length : false;
  
      if(isValid10){
        phoneNumber = "1" + phoneNumber;
      }
      
      if(!isValid10 && !isValid11){
        postRes.send("Please enter a valid phone number!");
      }
      
    } catch (e) {
      console.log(e);
      postRes.send("Please enter a valid phone number!");
    }
    
    pgClient.query(findUserByNumberQuery(phoneNumber))
      .then(res => {
        if(!res.rows.length){
          const query = {
            name: 'write-breezer',
            text: 'INSERT INTO breezers (phone, name, address, addressoptional, zip, email, city, password, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            values: [phoneNumber, req.body.name, req.body.address, req.body.addressoptional, req.body.zip, req.body.email, req.body.city, req.body.password, req.body.state]
          }
          pgClient.query(query).then(res => {
            console.log("see if phone is correct", req.body);
            sendSms(phoneNumber, postRes, 'Welcome to Brze! Please check back soon for beta!', 'You have successfully signed up, and should be receiving a text message to confirm.');
          }).catch(e =>  postRes.send("There was an error!"))
        } else {
          postRes.send("This number is already signed up!");
        }
      })
      .catch(e => {
        postRes.send("There was an error signing up!");
        console.error("Sign Up Failure", e);
      });
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

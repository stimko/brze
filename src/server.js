import App from "./App";
import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";

const bodyParser = require('body-parser');
const { Client } = require('pg');
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const client = new Client({ssl: true});

const startClient = async () => {
  await client.connect();
}
startClient();

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .post('/api/signup', (req, postRes) => {
    console.log(req.body);
    const query = {
      name: 'fetch-breezer',
      text: 'SELECT * FROM breezers WHERE phone = $1',
      values: [req.body.phone]
    }

    client.query(query)
      .then(res => {
        console.log("rows", res.rows);
        if(!res.rows.length){
          const query = {
            name: 'write-breezer',
            text: 'INSERT INTO breezers (phone, name, address, addressoptional, zip, email, city, password, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            values: [req.body.phone, req.body.name, req.body.address, req.body.addressoptional, req.body.zip, req.body.email, req.body.city, req.body.password, req.body.state]
          }
          client.query(query).then(res => {
            postRes.send(res);
          }).catch(e => console.log("Write Failure", e))
        }
      })
      .catch(e => console.error("Get Failure", e));
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

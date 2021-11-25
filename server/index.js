'use strict';

const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}! For Max and Kevin :-)`);
});


app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
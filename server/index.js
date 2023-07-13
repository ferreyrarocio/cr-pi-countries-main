const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
require("dotenv").config();
const {PORT} = process.env || 3001;

conn.sync({ alter: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
})
}).catch(error => console.error(error))

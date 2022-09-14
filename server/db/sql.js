const mysql = require('mysql')
// eslint-disable-next-line no-unused-vars
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'vue_store'
})
module.exports = connection

/*
FOR CONNECTING TO THE MySQL DATABASE 

Make sure you have MySQL Server Running with phpmyAdmin.
*/
const mysql = require('mysql')
const manifest = require('../manifest')

const connection = mysql.createConnection({
    host : 'localhost' , 
    user : 'root' ,
    database : manifest.DBName
})


module.exports = connection
/*
price ph no mal
OR MONGO DB Connection

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/dutyleave', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected")
}).catch((err) => {
    console.log("Connection failed")
})

*/
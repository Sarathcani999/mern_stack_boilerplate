const express = require('express')
const chalk = require('chalk')
const app = express()
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const connection = require('./config/connect')
const manifest = require('./manifest')
const users = require('./apis/users/users')

const PORT = manifest.PORT_SERVER

// Connecting to the MySQL Database

connection.connect((error) => {
    if (error) {
        console.log(chalk.bold.red("ERROR : ") + error.message)
    } else {
        console.log(chalk.bold.yellowBright("Connected to MySQL Database"))
    }
})

// middleware config

app.use(bodyparser.urlencoded({extended : true}))
app.use(bodyparser.json())
app.use(cookieparser())

app.use('/api/users' , users)

app.listen(PORT , () => {
    console.log(chalk.yellow("PORT established at " )+ chalk.white.bold(PORT))
})

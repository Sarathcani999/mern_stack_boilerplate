const connection = require('../../config/connect')
const router = require('express').Router()
const chalk = require('chalk')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_Key} = require('../../manifest')
const cookies = require('cookies')

router.post('/register' , async (req,res) => {

    if (req.body.username === undefined | req.body.password === undefined){
        res.status(500).send({"error" : "Provide all Fields"})
    }else{

        let hashedPassword = await bcrypt.hash(req.body.password , 8)

        let insertQuery = "INSERT INTO users(username , password) VALUES('"+ req.body.username +"' , '"+ hashedPassword +"' )"

        console.log(chalk.white.bold("ROUTE : ") + chalk.blueBright.italic("~/api/users/register"))
        console.log(chalk.yellowBright("req.body : ") + JSON.stringify(req.body))
        console.log(chalk.yellowBright("SQL Query : ") + chalk.italic(insertQuery))
    
        connection.query(insertQuery , (error,results,fields) => {
            if (error) {
                console.log(chalk.bold.red("SQL ERR : ")+error.message)
                res.status(500).send(error);
            }else {
                return res.sendStatus(201)
            }
        })
    }

})

router.post('/login' , (req,res) => {
    
    if (req.body.username === undefined | req.body.password === undefined){
        res.status(500).send({"error" : "Provide all Fields"})
    } else {
        let findUserByUsername = "SELECT * FROM users WHERE username = '"+ req.body.username + "'"
        console.log(chalk.yellowBright("SQL Query : ") + chalk.italic(findUserByUsername))
        connection.query(findUserByUsername , async (error , results , fields) => {
            if (error) {
                res.status(400).send(error.message)
            } else {
                if (results.length < 1) {
                    res.status(400).send()
                } else {
                    var hashedPassword = results[0].password
                    var isMatch = await bcrypt.compare(req.body.password , hashedPassword)
                    if(isMatch) {
                        // Login successful
                        var signedToken =  await jwt.sign(results[0].username , JWT_Key )
                        let sql = "INSERT INTO tokens (username , token) VALUES ('"+ results[0].username +"' , '" + signedToken + "')"
                        console.log(chalk.yellowBright("SQL Query : ") + chalk.italic(sql))
                        await connection.query(sql , (error , results , fields) => {
                            res.cookie('x_Auth' , signedToken)
                            res.status(200).send({
                                "Authentication Token" : signedToken
                            })
                        })                        
                    } else {
                        res.status(400).send()
                    }
                }
            }
        })
    }
})

module.exports = router
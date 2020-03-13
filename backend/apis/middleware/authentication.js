const {JWT_Key} = require('../../manifest')
const jwt = require('jsonwebtoken')
const connection = require('../../config/connect')

const authenticate = async (req,res,next) => {
    const token = req.header("x_Auth")
    try {
        const username = await jwt.verify(token , JWT_Key)
        let sql = "SELECT * FROM tokens WHERE tokens.username = '"+ username +"' AND tokens.token = '"+ token +"'"
        // console.log(sql)
        await connection.query(sql , (error ,results , fields) =>{
            if (results.length == 0) {
                res.status(500).send({
                    "Error" : "Not authorized , Can't access this page"
                })
            } else {
                // res.status(200).send({
                //     "message" : "Authorized, Can access this page"
                // })
                req.username = username
                next()
            }
        })
    } catch (e) {
        res.status(500).send({
            "Error" : "Not authorized , Can't access this page"
        })
    }
}

const notauthenticate = async (req,res,next) => {
    const token = req.header("x_Auth")
    try {
        const username = await jwt.verify(token , JWT_Key)
        let sql = "SELECT * FROM tokens WHERE tokens.username = '"+ username +"' AND tokens.token = '"+ token +"'"
        // console.log(sql)
        await connection.query(sql , (error ,results , fields) =>{
            if (results.length == 0) {
                // res.status(500).send({
                //     "Error" : "Not authorised"
                // })
                next()
            } else {
                res.status(200).send({
                    "message" : "Authorized, Can't access this page"
                })
            }
        })
    } catch (e) {
        next()
    }
}
module.exports = {
    authenticate , notauthenticate
}
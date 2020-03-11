const express = require('express')
const app = express()
const PORT = 5000

app.get('' , (req,res) => {
    res.send("<h2>NODE WORKING PROPERLY</h2>")
})

app.listen(PORT , () => {
    console.log("PORT established at " + PORT)
})
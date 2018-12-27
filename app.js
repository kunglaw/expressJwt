const express = require("express")
const jwt = require("jsonwebtoken")
const { ensureToken } = require("./helper/authHelper")
const app = express()

const port = 5700

app.get("/api",function(req,res){
    res.json({
        text:"my api"
    })
})

app.post("/api/login",function( req, res){
    const user = { id:5 , name:"Aries Dimas Yudhistira" }
    const token = jwt.sign({ user },"my_secret_key")
    res.json({
        token: token
    })
})

app.get("/api/protected",ensureToken, function(req, res){
    
    jwt.verify(req.token, "my_secret_key", function(err, data){
        if(err) {
            res.sendStatus(403)
        } else {
            res.send({
                text:"this is protected",
                data: data 
            })
        }
    })
    
    res.json({
        text:"this is protected"
    })
})

app.listen(port,function(){
    console.log("Application running on port",port)
})
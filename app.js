const fs = require('fs')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3000
require("dotenv").config();
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
const routes = require('./routes/routes');  
const bodyParser = require('body-parser');
app.use(bodyParser.json())


app.use('/api', routes)

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.listen(port, portCheck())

app.use(express.json());

function real(req, res){
    res.writeHead(200, {"Content-Type" : "text/html"})
    fs.readFile("index.html", function (error, data){
        if(error){
            res.writeHead(404)
            res.write("file not found lol")
        }else
        {
            res.write(data)
        }
        res.end()

    })
}
function portCheck(error){
    if(error){
        console.log("Something went wrong...\n", error)


    }
    else{
        console.log("Stalking on ", port)
    }
}
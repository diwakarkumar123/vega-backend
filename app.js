const express = require('express')
const dotenv = require('dotenv').config;
const jwt = require('jsonwebtoken');
const body_parser = require('body-parser')

const mainroute = require('./src/Route')

const { testDbConnection } = require('./src/Config/db')

const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

testDbConnection()


app.use(cors({origin:"*",methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
credentials: true,
exposedHeaders: ['x-auth-token']}));
app.use(express.json())

app.use(cors({
    origin: "http://localhost:3000",  // React frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));



// Parse JSON-encoded bodies
app.use(body_parser.json());
app.use(express.static('./public'));


// Parse URL-encoded bodies
app.use(body_parser.urlencoded({ extended: true }));
app.use('', mainroute);

app.get('/register', (req, res) => {
    console.log("route hello called")
    res.send({ 'message': 'hello user i am here' })
})
app.listen(port, () => {
    console.log(`server runing on port ${port}`)
})
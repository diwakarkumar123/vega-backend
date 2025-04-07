import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

import mainRoute from './Route';
import { testDbConnection } from './Config/db';


dotenv.config();

const app = express();
testDbConnection();

// CORS middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  exposedHeaders: ['x-auth-token']
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/hello', (req, res) => {
    console.log("route hello called")
    res.send({ 'message': 'hello user i am here' })
})
// app.use('/', mainRoute);
export default app;

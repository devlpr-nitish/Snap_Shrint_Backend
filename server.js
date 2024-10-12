import './env.js';
import express from 'express';
import connectToDB from './src/dbConnection/mongoose.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './src/features/users/users.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import snapRouter from './src/features/snaps/snaps.routes.js';
const server = express();


// Allow CORS for all routes
server.use(cors());

// to recieve data from the client
server.use(bodyParser.json());

server.use("/api/users", userRouter);
server.use("/api/snaps", jwtAuth, snapRouter);

server.get('/', (req, res) => {
    res.send("Hello welcome to snap shrint");   
})

server.listen(3000, ()=>{
    console.log(`server is running at port 3000`);   
    connectToDB();
})
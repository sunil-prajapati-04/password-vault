import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import './middelware/google.js';
import db from './lib/db.js';
import { config } from 'dotenv';
import authRouter from './routes/auth.routes.js';
import vaultRouter from './routes/vault.routes.js';
import passport from 'passport';

config();
const app = express();
const Port = process.env.PORT;


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(passport.initialize());


app.use('/pV/auth',authRouter);
app.use('/pV/vault',vaultRouter);



app.listen(Port,()=>{
    console.log(`app is listening on ${Port}`);
})
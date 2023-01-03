import express, { Application } from "express";
const app: Application = express();
import mongoose from 'mongoose';

app.use(express.urlencoded({ extended: true }));
import ENV_VARS from "./configurations/configEnv";
import logger_routes from "./routes/logger_routes";
import { customErrorHandler, pageNotFound } from "./middleware/errorHandler";
import path from "path";

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

import cors from 'cors';
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(corsOptions));

mongoose.set('strictQuery', false);
const URL: string = ENV_VARS.db.url;

mongoose.connect(`${URL}`)
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch(() => {
    throw new Error("Mongoose connection failed");
  });


app.use('/api', logger_routes);

app.use("*",pageNotFound);

app.use(customErrorHandler);

app.listen(3000, () => console.log("App listening on port 3000"));
import express from "express";
import morgan from "morgan";
import { config }  from "dotenv";
import tripRoutes from "./components/trips/routes";

config();

const app = express();

//settings
app.set("port", process.env.PORT)

//middleawres
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//routes
app.use('/api/trips/v1', tripRoutes);

export default app;
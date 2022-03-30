import express from "express";
import morgan from "morgan";

import tripRoutes from "./components/trips/routes";

const app = express();

//settings
app.set("port", process.env.PORT || 3000)

//middleawres
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/trips/v1', tripRoutes);

export default app;
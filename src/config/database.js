import { connect } from "mongoose";
import { config } from "dotenv";

config();

//connection to database
connect(process.env.MONGO_HOST, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((db) => {
    console.log("DB connected to ", db.connection.name);
  })
  .catch((e) => {
    console.error(e);
  });







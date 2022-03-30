import { connect } from "mongoose";
import { config }  from "dotenv";

config();

//connection to database
(async () => {
  try {
    const db = await connect(process.env.MONGO_HOST);
    console.log("DB connected to ", db.connection.name);
  } catch (e) {
    console.error(e);
  }
})();
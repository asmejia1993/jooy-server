import { connect } from "mongoose";

//connection to database
(async () => {
  try {
    const db = await connect('mongodb://localhost/jooycar');
    console.log("DB connected to ", db.connection.name);
  } catch (e) {
    console.error(e);
  }
})();
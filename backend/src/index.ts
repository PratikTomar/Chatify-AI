import app from "./app.js";
import { connectToDB } from "./db/connection.js";

const PORT = process.env.PORT || 5000;

connectToDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server Opened & Connected  to Database" + " " + PORT)
    );
  })
  .catch((err) => {
    console.log(err);
  });

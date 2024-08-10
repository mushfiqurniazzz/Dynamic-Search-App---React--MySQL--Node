//importing neccessary libraries and functions
const express = require("express");
const app = express();
const AppRoutes = require("./Routes/AppRoutes");
const cors = require("cors");
const ConnectDB = require("./ConnectDB");
require("dotenv").config();

//declare the port using a "or" syntax
const port = process.env.PORT || 5000;

//using express app use method
app.use(cors());

//IFFE function to ass the pool method to the routes for using querys in controllers
(async () => {
  // declare pool as the invoked function
  const pool = await ConnectDB();

  //for using other functions while using the pool
  app.use((req, res, next) => {
    req.pool = pool;
    next();
  });

  //for passing the pool to the route
  app.use(express.json());
  app.use("/", AppRoutes);

  //making the app listen at a specific port
  app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
  });
})();

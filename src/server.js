import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
require("dotenv").config();
import connection from "./config/connectDB";
import configCors from "./config/cors";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 8080;
//config cors
configCors(app);
//config view engine
configViewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//test connection DB
// connection();
//config cookies parser
app.use(cookieParser());

//init web route
initWebRoutes(app);
initApiRoutes(app);
app.use((req, res) => {
  return res.send("404 not found");
});
app.listen(PORT, () => {
  console.log("Listening on PORT=", PORT);
});

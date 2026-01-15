import express from "express";
import postRoutes from "./routes/posts.routes.js";
import { loadEnvFile } from "node:process";
import morgan from "morgan";
import { randomUUID } from "crypto";
import { shutdown, init } from"./db/database.config.js";
import http from "node:http";
import errorHandler from "./middlewares/error.middleware.js";
import path from "node:path";

loadEnvFile();

const s = express();
const PORT = process.env.PORT;

/*
s.use(function assignId (req, res, next) {req.id = randomUUID(); next()})
morgan.token('id', function getId(req) { return req.id});
*/

s.use(morgan("dev"));
s.use("/api/posts", postRoutes);
s.use("/static", express.static("./static"));
const htmpath = path.resolve("./index.html");
s.get("/", function(req, res){
 res.sendFile(htmpath);
});

s.use(errorHandler);

const server = http.createServer(s);
server.listen(PORT, async function(err){
 if (err) {
  console.error(`Server failed to start on port ${PORT}.`, err.message);
  process.exit(1);
 } else {
  console.log(`Server up and active on port: ${PORT}`);
  await init();
 }
});
server.timeout = 10 * 1000;

const gracefulExit =()=>{
 shutdown();
 server.close();
 console.log("shutting down server!!!");
};

process.on("SIGINT", gracefulExit);
process.on("SIGTERM", gracefulExit);

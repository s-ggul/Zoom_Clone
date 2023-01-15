import http from "http";
// import WebSocket from "ws";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => {
  console.log(`Listening on http://localhost:3000`);
};

const httpServer = http.createServer(app); // http 서버를 생성하고 서버에 접근할 준비과정
const wsServer = SocketIO(httpServer);

httpServer.listen(3000, handleListen);
// 이제 localhoost는 동일한 포트에서 http, ws request를 모두 처리할 수 있다.

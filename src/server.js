import http from "http";
// import WebSocket from "ws";
import SocketIo from "socket.io";
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
const wsServer = SocketIo(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done(); // done : front에서 전달한 3번째 인자 => 콜백함수
      // 이렇게 전달된 콜백을 백엔드에서 호출하면 function은 프론트엔드에서 실행된다.
      // 증말 으메이징
    }, 10000);
  });
});

/* -----------------------기존 Vanilla JS에서의 WebSocket 이용 방식-----------------------
// const wss = new WebSocket.Server({ server });
// 이렇게 인자로 http서버를 주면 http 서버와 WebSocket서버를 둘 다 돌릴 수 있다.
// http 서버가 필요하지 않은 경우엔 인자로 안넘기면 됨
// 인자를 쓰는 것이 필수사항이 아니다. => 이경우 두 개의 서버가 같은 port에 있길 원해서이다.
// http 서버위에 WebSocket서버를 만든 것이다.

// Fake Database
// const sockets = [];

// // WebSocket Event
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous";
//   socket.on("close", () => {
//     console.log("Disconnected from Client"); // 서버를 끄는 것이 아닌 브라우저 창을 끄거나 탭을 끄면 발생
//   });
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname} : ${message.payload}`)
//         );
//         break;
//       case "nickname":
//         socket["nickname"] = message.payload; // 소켓에 nickname 속성을 설정
//         break;
//     }
//   });
// }); // 누군가와 연결했을때 => 연결도중에 정의할 이벤트를 콜백에 정의한다.
*/

httpServer.listen(3000, handleListen);
// 이제 localhoost는 동일한 포트에서 http, ws request를 모두 처리할 수 있다.

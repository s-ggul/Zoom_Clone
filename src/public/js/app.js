const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  // socket 이 connection 을 open 했을때 발생하는 이벤트
  console.log("Connectd to Server");
});

socket.addEventListener("message", (message) => {
  console.log("New message : ", message.data, " from the Server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

setTimeout(() => {
  socket.send("Hello!! from the Client");
}, 10000);

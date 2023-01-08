const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
  // 단순히 JSON으로 보내지 않고 String으로 변환하는 이유는 다양한 서버에서 사용하는 언어가 다르고 문자열로 보내 이후 파싱하기 위해서이다.
  // 또한 WS는 브라우저 API 이기 때문에 데이터에 관한 어떠한 관여도 할 수 없고 단순한 문자열을 처리하게 해야한다.
}

socket.addEventListener("open", () => {
  // socket 이 connection 을 open 했을때 발생하는 이벤트
  console.log("Connectd to Server");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

// setTimeout(() => {
//   socket.send("Hello!! from the Client");
// }, 10000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  const li = document.createElement("li");
  li.innerText = `You : ${input.value}`;
  messageList.append(li);
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);

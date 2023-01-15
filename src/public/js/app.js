// 먼저 유저로부터 비디오를 가져와서 화면에 보여줘여 한다.
// 두번째는 버튼을 만들어 마이크 카메라를 껐다켰다하는 버튼을 만들어야한다.
// 전면과 후면 카메라를 전환하는 기능을 만들어야 한다.

const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");
// stream을 받아야한다. => 비디오와 오디오가 결합된것
let myStream;
// 음소거 여부 및 카메라 켜짐여부를 추적할 변수들이 필요함

let muted = false;
let cameraOff = false;

async function getCamers() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId; // 디바이스 아이디
      option.innerText = camera.label; // 디바이스 이름
      if (currentCamera.label == camera.label) {
        option.selected = true;
      }
      cameraSelect.append(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  // 결과적으론 카메라를 실행하는 함수
  const initialConstraints = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstraints
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      // 초기 디바이스 id가 없을 때만 실행
      await getCamers();
    }
  } catch (error) {
    console.log(error);
  }
}

getMedia();

function handleMuteClick() {
  //console.log(myStream.getAudioTracks()); // track을 출력
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  // 트랙 값을 기존의 반대값으로 바꿈으로써 음소거 기능 구현
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}
function handleCameraClick() {
  //console.log(myStream.getVideoTracks()); // track을 출력
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  // 트랙 값을 기존의 반대값으로 바꿈으로써 화면중지 기능 구현
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

async function handleCameraChange() {
  await getMedia(cameraSelect.value);
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
cameraSelect.addEventListener("input", handleCameraChange);

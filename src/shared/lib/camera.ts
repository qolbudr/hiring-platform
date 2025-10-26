import { HandLandmarkerResult, NormalizedLandmark } from "@mediapipe/tasks-vision";

export function drawResults(canvas: HTMLCanvasElement, video: HTMLVideoElement, results: HandLandmarkerResult) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const videoAspect = video.videoWidth / video.videoHeight;
  const canvasAspect = canvas.width / canvas.height;

  let sx = 0,
    sy = 0,
    sWidth = video.videoWidth,
    sHeight = video.videoHeight;

  if (videoAspect > canvasAspect) {
    const newWidth = video.videoHeight * canvasAspect;
    sx = (video.videoWidth - newWidth) / 2;
    sWidth = newWidth;
  } else {
    const newHeight = video.videoWidth / canvasAspect;
    sy = (video.videoHeight - newHeight) / 2;
    sHeight = newHeight;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);

  results.landmarks.forEach((landmarks) => {
    ctx.fillStyle = "rgba(0,255,0,0.7)";
    landmarks.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x * canvas.width, p.y * canvas.height, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  });
}

export function takeSnapshot(video: HTMLVideoElement, setPhoto: (photo: string) => void) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  setPhoto(canvas.toDataURL("image/png"));
}

export function detectGesture(landmarks: NormalizedLandmark[]): number | null {
  const fingerTips = [4, 8, 12, 16, 20];
  const fingerBases = [2, 5, 9, 13, 17];

  const isRightHand = landmarks[17].x < landmarks[5].x;
  let fingersUp = 0;

  const thumbTip = landmarks[fingerTips[0]];
  const thumbBase = landmarks[fingerBases[0]];
  const thumbUp = isRightHand
    ? thumbTip.x > thumbBase.x + 0.05
    : thumbTip.x < thumbBase.x - 0.05;

  for (let i = 1; i < 5; i++) {
    const tip = landmarks[fingerTips[i]];
    const base = landmarks[fingerBases[i]];
    if (tip.y < base.y) fingersUp++;
  }

  if (fingersUp === 0 && thumbUp) return null;

  if (fingersUp === 1) return 1;
  if (fingersUp === 2) return 2;
  if (fingersUp === 3) return 3;
  return null;
}
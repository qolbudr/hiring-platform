import { useEffect, useRef, useState } from "react";
import { Modal } from "@/shared/components/Modal";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { useModalStore } from "@/shared/store/modal.store";
import { drawResults, takeSnapshot, detectGesture } from "@/shared/lib/camera";
import { Icon } from "@iconify/react";
import { useJobStore } from "@/module/job/store/job.store";

interface ModalPhotoPickerProps {
  onChange: (value: string) => void,
}

const CAMERA_WIDTH = 640;
const CAMERA_HEIGHT = 480;
const MODEL_URL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";

export const ModalPhotoPicker: React.FC<ModalPhotoPickerProps> = (props: ModalPhotoPickerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [detectedPose, setDetectedPose] = useState<number | null>(null); // ✅ pose number
  const [detectionStatus, setDetectionStatus] = useState<"detected" | "undetected">("undetected"); // ✅ status
  const modal = useModalStore();
  const isOpen = modal.isOpen("photo-picker-modal");
  const store = useJobStore();

  useEffect(() => {
    if (!isOpen) return;

    let handLandmarker: HandLandmarker | null = null;
    let animationFrameId: number;
    let videoStream: MediaStream | null = null;

    const startCameraAndHandTracking = async () => {
      const vision = await FilesetResolver.forVisionTasks(WASM_URL);
      handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_URL },
        runningMode: "VIDEO",
        numHands: 1,
      });

      videoStream = await navigator.mediaDevices.getUserMedia({
        video: { width: CAMERA_WIDTH, height: CAMERA_HEIGHT },
      });

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      video.srcObject = videoStream;
      await video.play();

      [video.width, video.height, canvas.width, canvas.height] = [
        CAMERA_WIDTH,
        CAMERA_HEIGHT,
        CAMERA_WIDTH,
        CAMERA_HEIGHT,
      ];

      const processFrame = async () => {
        if (video.readyState === 4 && handLandmarker) {
          const results = handLandmarker.detectForVideo(video, performance.now());
          drawResults(canvas, video, results);

          if (results.landmarks.length > 0) {
            const gesture = detectGesture(results.landmarks[0]);

            if (gesture) {
              setDetectedPose(gesture);
              setDetectionStatus("detected");

              if (!isCapturing && gesture === 3) {
                setIsCapturing(true);
                takeSnapshot(video, props.onChange);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setIsCapturing(false);
                modal.closeModal("photo-picker-modal");
              }
            } else {
              setDetectedPose(null);
              setDetectionStatus("undetected");
            }
          } else {
            setDetectedPose(null);
            setDetectionStatus("undetected");
          }
        }
        animationFrameId = requestAnimationFrame(processFrame);
      };

      processFrame();
    };

    startCameraAndHandTracking();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoStream) {
        videoStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isOpen, isCapturing]);

  return (
    <Modal
      title="Raise Your Hand to Capture"
      subtitle="We’ll take the photo once your hand pose is detected."
      identifier="photo-picker-modal"
    >
      <div className="p-6">
        <div className="flex flex-col items-center space-y-4 relative">
          <video ref={videoRef} className="hidden" />
          <div className="relative w-full flex bg-black justify-center">
            <canvas ref={canvasRef} className="h-1/2" />

            <div
              className={`absolute top-4 left-4 px-3 py-1 text-sm font-semibold rounded-md transition-all duration-200 ${detectionStatus === "detected"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
                }`}
            >
              {detectionStatus === "detected"
                ? `Pose ${detectedPose}`
                : "Undetected"}
            </div>

            <div
              className={`absolute border-4 rounded-lg transition-all duration-300 ${detectionStatus === "detected"
                ? "border-green-500"
                : "border-red-500"
                }`}
              style={{
                top: "10%",
                left: "10%",
                width: "80%",
                height: "80%",
              }}
            ></div>
          </div>

          <p className="text-s text-center">
            To take a picture, follow the hand poses in order. The system will
            capture automatically after the final pose.
          </p>

          <div className="flex justify-center items-center space-x-4">
            {[1, 2, 3].map((pose) => (
              <div key={pose} className="flex items-center">
                <img
                  src={`/pose/${pose}.png`}
                  alt={`Pose ${pose}`}
                  className={`w-24 h-24 object-contain transition-transform duration-200 ${detectedPose === pose
                    ? "ring-4 ring-green-500 scale-105 rounded-xl"
                    : ""
                    }`}
                />
                {pose < 3 && (
                  <Icon
                    icon="uil:arrow-right"
                    className="size-6 text-gray-500 mx-2"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

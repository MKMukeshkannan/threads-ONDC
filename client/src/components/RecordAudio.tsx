"use client";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef, useState } from "react";
import ChatBot from "../assets/chat-bot.json";
import { useProducts } from "@/store";
import { product_data } from "@/utils/data";

export default function RecordAudio() {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder>();
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audio, setAudio] = useState<string>();
  const mimeType = "audio/webm";

  const initBot = useRef<LottieRefCurrentProps>(null);
  const idleBot = useRef<LottieRefCurrentProps>(null);
  const listeningBot = useRef<LottieRefCurrentProps>(null);

  const { products, replaceProducts } = useProducts((state) => state);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    if (!stream) return;
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return;

    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
      replaceProducts(product_data);
    };
  };

  if (!permission) {
    return (
      <main className="relative text-center">
        <section>
          <Lottie
            loop={false}
            initialSegment={[0, 100]}
            lottieRef={initBot}
            onComplete={() => {
              setTimeout(() => {
                initBot.current?.playSegments([490, 500]);
              }, 2000);
            }}
            className="w-80 h-80"
            animationData={ChatBot}
          />
        </section>

        <button
          className="absolute bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover"
          onClick={getMicrophonePermission}
          type="button"
        >
          Get Microphone
        </button>
      </main>
    );
  }

  return (
    <main className="relative text-center">
      {recordingStatus === "inactive" &&
        (
          <>
            <Lottie
              loop={false}
              onComplete={() => {
                setTimeout(() => {
                  idleBot.current?.playSegments([490, 500]);
                }, 2000);
              }}
              lottieRef={idleBot}
              initialSegment={[490, 500]}
              className="w-80 h-80"
              animationData={ChatBot}
            />
            <button
              onClick={startRecording}
              className="absolute bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover"
              type="button"
            >
              Start Recording
            </button>
          </>
        )}
      {recordingStatus === "recording" &&
        (
          <>
            <Lottie
              loop={false}
              lottieRef={listeningBot}
              onComplete={() => {
                console.log("h");
                listeningBot.current?.playSegments([321, 450]);
              }}
              initialSegment={[270, 450]}
              animationData={ChatBot}
              className="w-80 h-80"
            />
            <button
              className="absolute bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover"
              onClick={stopRecording}
              type="button"
            >
              Stop Recording
            </button>
            <h1 className=" absolute bottom-0 mx-auto left-0 right-0 text-center  font-mono text-xs font-bold">
              How can i help you ?
            </h1>
          </>
        )}
    </main>
  );
}

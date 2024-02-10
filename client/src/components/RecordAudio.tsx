"use client";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef, useState } from "react";
import ChatBot from "../assets/chat-bot.json";
import Wrong from "../assets/wrong.json";
import { useProducts } from "@/store";
import { websiteHost } from "@/utils/constants";

export default function RecordAudio() {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder>();
  const [shopStatus, setShopStatus] = useState<
    "inactive" | "recording" | "error" | "fetching"
  >("inactive");
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
    setShopStatus("recording");
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

    setShopStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.wav");
      try {
        setShopStatus("fetching");
        const res = await fetch(`${websiteHost}/api/user/voice`, {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
        setAudio(audioUrl);
        setAudioChunks([]);
        if (result.status == "success") {
          replaceProducts(result.data);
        } else {
          replaceProducts([]);
        }
      } catch {
        setShopStatus("error");
        setTimeout(() => {
          setShopStatus("inactive");
        }, 3000);
      }
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
      {shopStatus === "inactive" && (
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
            className="absolute bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover disabled:bg-opacity-80 disabled:hover:cursor-not-allowed "
            type="button"
          >
            Start Recording
          </button>
        </>
      )}

      {shopStatus === "recording" && (
        <>
          <Lottie
            loop={false}
            lottieRef={listeningBot}
            onComplete={() => {
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

      {shopStatus === "fetching" && (
        <>
          <>
            <Lottie
              loop={false}
              lottieRef={listeningBot}
              onComplete={() => {
                listeningBot.current?.playSegments([321, 450]);
              }}
              initialSegment={[90,230]}
              animationData={ChatBot}
              className="w-80 h-80"
            />
            <button
              className="absolute bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover"
              disabled
              onClick={stopRecording}
              type="button"
            >
              Stop Recording
            </button>
            <h1 className=" absolute bottom-0 mx-auto left-0 right-0 text-center  font-mono text-xs font-bold">
              Kindly be patient, till i fetch your request..
            </h1>
          </>
        </>
      )}

      {shopStatus === "error" && (
        <>
          <>
            <Lottie
              loop={false}
              animationData={Wrong}
              className="w-48 h-48"
            />
            <button
              className=" bottom-10 mx-auto left-0 right-0 text-center border-black border-2 rounded-md p-2 bg-satRed text-lightBeige font-mono font-black hover:bg-satRed-hover"
              onClick={stopRecording}
              disabled
              type="button"
            >
              Stop Recording
            </button>
            <h1 className="  bottom-0 mx-auto left-0 right-0 text-center  font-mono text-xs font-bold">
              There was an error
            </h1>
          </>
        </>
      )}
    </main>
  );
}

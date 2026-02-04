import { useState, useEffect } from "react";

export default function UIOverlay({ refs }) {
  const [listening, setListening] = useState(false);
  const [lastCommand, setLastCommand] = useState("None");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (!listening) return; // only run if user starts listening
    if (!refs) return; // refs not ready yet

    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Web Speech API not supported");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.interimResults = false;
    recog.lang = "en-US";

    recog.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .trim()
        .toLowerCase();
      setLastCommand(transcript);

      // Safe null checks
      const leftLeg = refs.leftLeg?.current;
      const rightLeg = refs.rightLeg?.current;
      const leftArm = refs.leftArm?.current;
      const rightArm = refs.rightArm?.current;
      const head = refs.head?.current;
      const torso = refs.torso?.current;

      switch (transcript) {
        case "walk":
          if (leftLeg && rightLeg) {
            leftLeg.rotation.x = 0.5;
            rightLeg.rotation.x = -0.5;
          }
          break;
        case "stop":
          if (leftLeg && rightLeg) {
            leftLeg.rotation.x = 0;
            rightLeg.rotation.x = 0;
          }
          break;
        case "raise hand":
          if (leftArm && rightArm) {
            leftArm.rotation.x = -1;
            rightArm.rotation.x = -1;
          }
          break;
        case "lower hand":
          if (leftArm && rightArm) {
            leftArm.rotation.x = 0;
            rightArm.rotation.x = 0;
          }
          break;
        case "look left":
          if (head) head.rotation.y = 0.5;
          break;
        case "look right":
          if (head) head.rotation.y = -0.5;
          break;
        case "center head":
          if (head) head.rotation.y = 0;
          break;
        case "go left":
          if (torso) torso.position.x -= 0.5;
          break;
        case "go right":
          if (torso) torso.position.x += 0.5;
          break;
        case "go forward":
          if (torso) torso.position.z -= 0.5;
          break;
        case "go back":
          if (torso) torso.position.z += 0.5;
          break;
        case "dance":
          if (torso) torso.rotation.y += Math.PI / 4;
          break;
        default:
          break;
      }
    };

    recog.onerror = (event) => console.error("Speech recognition error:", event);
    recog.onend = () => {
      if (listening) recog.start(); // auto-restart
    };

    recog.start();
    setRecognition(recog);

    return () => {
      recog.stop(); // cleanup when unmounting or stopping
    };
  }, [listening, refs]);

  const toggleListening = () => {
    setListening((prev) => !prev);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <div className="flex h-full w-full flex-col justify-between p-6">

        {/* Header */}
        <div className="pointer-events-auto self-start rounded-xl bg-black/60 px-5 py-3 text-white backdrop-blur">
          <h1 className="text-lg font-semibold">Virtual 3D Robot</h1>
          <p className="text-sm text-gray-300">Voice Controlled</p>
        </div>

        {/* Mic & Status */}
        <div className="pointer-events-auto self-center rounded-xl bg-black/60 px-6 py-4 text-white backdrop-blur flex flex-col items-center gap-2">
          <button
            onClick={toggleListening}
            className={`px-5 py-2 rounded-lg font-semibold text-white ${
              listening ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {listening ? "Stop Listening 🎤" : "Start Listening 🎤"}
          </button>

          <p className="text-sm">
            Last Command: <span className="font-medium">{lastCommand}</span>
          </p>

          {/* Commands reordered for clarity */}
          <p className="text-sm">
            🎙️ Say commands in this order:{" "}
            <span className="font-medium">walk</span>,{" "}
            <span className="font-medium">stop</span>,{" "}
            <span className="font-medium">raise hand</span>,{" "}
            <span className="font-medium">lower hand</span>,{" "}
            <span className="font-medium">look left</span>,{" "}
            <span className="font-medium">look right</span>,{" "}
            <span className="font-medium">center head</span>,{" "}
            <span className="font-medium">go left</span>,{" "}
            <span className="font-medium">go right</span>,{" "}
            <span className="font-medium">go forward</span>,{" "}
            <span className="font-medium">go back</span>,{" "}
            <span className="font-medium">dance</span>
          </p>
        </div>
      </div>
    </div>
  );
}

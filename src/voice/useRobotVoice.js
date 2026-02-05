// src/voice/useRobotVoice.jsx
import { useState, useRef, useEffect } from "react";

export default function useRobotVoice(refs) {
  const [listening, setListening] = useState(false);
  const [lastCommand, setLastCommand] = useState("None");
  const recognitionRef = useRef(null);

  const commandsMap = {
    walk: () => {
      refs.leftLeg.current.rotation.x = 0.5;
      refs.rightLeg.current.rotation.x = -0.5;
    },
    stop: () => {
      refs.leftLeg.current.rotation.x = 0;
      refs.rightLeg.current.rotation.x = 0;
    },
    "raise hands": () => {
      refs.leftArm.current.rotation.x = -1;
      refs.rightArm.current.rotation.x = -1;
    },
    "lower hands": () => {
      refs.leftArm.current.rotation.x = 0;
      refs.rightArm.current.rotation.x = 0;
    },
    "look left": () => {
      refs.head.current.rotation.y = 0.5;
    },
    "look right": () => {
      refs.head.current.rotation.y = -0.5;
    },
    center: () => {
      refs.head.current.rotation.y = 0;
    },
    "go forward": () => {
      if (refs.body.current) refs.body.current.position.z -= 0.2;
    },
    "go backward": () => {
      if (refs.body.current) refs.body.current.position.z += 0.2;
    },
    "go left": () => {
      if (refs.body.current) refs.body.current.position.x -= 0.2;
    },
    "go right": () => {
      if (refs.body.current) refs.body.current.position.x += 0.2;
    },
    run: () => {
      // Reuse previous dance/run movement
      let beat = false;
      if (recognitionRef.current.runInterval)
        clearInterval(recognitionRef.current.runInterval);

      recognitionRef.current.runInterval = setInterval(() => {
        beat = !beat;
        refs.leftArm.current.rotation.x = beat ? 0.8 : -0.8;
        refs.rightArm.current.rotation.x = beat ? -0.8 : 0.8;
        refs.leftLeg.current.rotation.x = beat ? 0.5 : -0.5;
        refs.rightLeg.current.rotation.x = beat ? -0.5 : 0.5;
      }, 400);
    },
    dance: () => {
      // Simple cute dance: swing arms side to side
      let swing = false;
      if (recognitionRef.current.danceInterval)
        clearInterval(recognitionRef.current.danceInterval);

      recognitionRef.current.danceInterval = setInterval(() => {
        swing = !swing;
        refs.leftArm.current.rotation.z = swing ? 0.5 : -0.5;
        refs.rightArm.current.rotation.z = swing ? -0.5 : 0.5;
      }, 500);
    },
  };

  const initRecognition = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Web Speech API not supported in this browser");
      return null;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.interimResults = false;
    recog.lang = "en-US";

    recog.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript
          .trim()
          .toLowerCase();
      setLastCommand(transcript);

      Object.keys(commandsMap).forEach((cmd) => {
        if (transcript.includes(cmd)) {
          commandsMap[cmd]();
        }
      });
    };

    recog.onerror = (event) =>
      console.error("Speech recognition error:", event.error);

    recog.onend = () => {
      if (listening) recog.start(); // auto-restart
    };

    return recog;
  };

  const start = () => {
    if (!recognitionRef.current) recognitionRef.current = initRecognition();
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch (err) {
      console.warn("Recognition start error:", err.message);
    }
  };

  const stop = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setListening(false);
    if (recognitionRef.current?.runInterval)
      clearInterval(recognitionRef.current.runInterval);
    if (recognitionRef.current?.danceInterval)
      clearInterval(recognitionRef.current.danceInterval);
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        if (recognitionRef.current?.runInterval)
          clearInterval(recognitionRef.current.runInterval);
        if (recognitionRef.current?.danceInterval)
          clearInterval(recognitionRef.current.danceInterval);
      }
    };
  }, []);

  return { start, stop, listening, lastCommand };
}

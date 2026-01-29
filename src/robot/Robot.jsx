import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const Robot = () => {
  const canvasRef = useRef(null);
  const recognitionRef = useRef(null);
  const movementRef = useRef(null);
  const danceRef = useRef(null);

  const [position, setPosition] = useState({ x: 135, y: 135 });
  const [status, setStatus] = useState("Idle");
  const [listening, setListening] = useState(false);
  const [mode, setMode] = useState("single"); // single or continuous
  const [scale, setScale] = useState(1); // simulate forward/backward

  const step = 20; // horizontal / vertical step
  const scaleStep = 0.1; // scale step for forward/backward

  // Draw a cartoon robot with scaling
  const drawRobot = (ctx, x, y, scale) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear whole canvas

    const w = 30 * scale;
    const h = 40 * scale;
    const headH = 20 * scale;
    const eyeR = 3 * scale;
    const armW = 5 * scale;
    const armH = 20 * scale;
    const legW = 5 * scale;
    const legH = 10 * scale;
    const mouthR = 3 * scale;

    // Body
    ctx.fillStyle = "#2563eb";
    ctx.fillRect(x, y + headH, w, h);

    // Head
    ctx.fillStyle = "#1e40af";
    ctx.fillRect(x, y, w, headH);

    // Eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x + 0.25 * w, y + 0.4 * headH, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 0.75 * w, y + 0.4 * headH, eyeR, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x + 0.5 * w, y + 0.75 * headH, mouthR, 0, Math.PI);
    ctx.fill();

    // Arms
    ctx.fillStyle = "#1e40af";
    ctx.fillRect(x - armW, y + 0.6 * headH, armW, armH);
    ctx.fillRect(x + w, y + 0.6 * headH, armW, armH);

    // Legs
    ctx.fillRect(x + 0.15 * w, y + headH + h, legW, legH);
    ctx.fillRect(x + 0.65 * w, y + headH + h, legW, legH);
  };

  // Dance pattern
  const dancePattern = [
    "forward",
    "forward",
    "right",
    "backward",
    "left",
    "down",
    "up",
    "right",
    "left",
  ];

  // Movement logic
  const move = (direction) => {
    setPosition((prev) => {
      let newPos = { ...prev };
      switch (direction) {
        case "left":
          newPos.x = Math.max(prev.x - step, 0);
          break;
        case "right":
          newPos.x = Math.min(prev.x + step, 600 - 30 * scale);
          break;
        case "up":
          newPos.y = Math.max(prev.y - step, 0);
          break;
        case "down":
          newPos.y = Math.min(prev.y + step, 300 - 40 * scale);
          break;
      }
      return newPos;
    });

    // Scale for forward/backward
    setScale((prev) => {
      if (direction === "forward") return Math.min(prev + scaleStep, 2);
      if (direction === "backward") return Math.max(prev - scaleStep, 0.5);
      return prev;
    });
  };

  // Start move based on mode
  const startMove = (direction) => {
    stopMove();
    if (mode === "continuous") {
      movementRef.current = setInterval(() => move(direction), 200);
    } else {
      move(direction);
    }
  };

  const stopMove = () => {
    if (movementRef.current) {
      clearInterval(movementRef.current);
      movementRef.current = null;
    }
  };

  const startDance = () => {
    let stepIndex = 0;
    stopDance();
    danceRef.current = setInterval(() => {
      move(dancePattern[stepIndex]);
      stepIndex = (stepIndex + 1) % dancePattern.length;
    }, 300);
  };

  const stopDance = () => {
    if (danceRef.current) {
      clearInterval(danceRef.current);
      danceRef.current = null;
    }
  };

  // Redraw robot whenever position or scale changes
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawRobot(ctx, position.x, position.y, scale);
  }, [position, scale]);

  // Initialize speech recognition (only once)
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();

      setStatus(command);

      // Stop any previous move or dance
      stopMove();
      stopDance();

      // Respond to commands
      switch (command) {
        case "left":
        case "right":
        case "up":
        case "down":
        case "forward":
        case "backward":
          startMove(command);
          break;
        case "stop":
          stopMove();
          stopDance();
          break;
        case "dance":
          startDance();
          break;
      }
    };

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []); // initialize once

  // Toggle microphone listening
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    listening ? recognitionRef.current.stop() : recognitionRef.current.start();
  };

  // Toggle single/continuous mode
  const toggleMode = () => {
    setMode((prev) => (prev === "single" ? "continuous" : "single"));
    stopMove();
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-6 px-6 bg-blue-100">
      <h2 className="text-2xl font-bold text-gray-800 mt-10">
        Voice-Controlled Virtual Robot
      </h2>

      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="border-2 border-gray-300 rounded-lg bg-gray-50"
      />

      <button
        onClick={toggleListening}
        className={`relative flex items-center justify-center w-16 h-16 rounded-full transition ${
          listening
            ? "bg-blue-600 animate-pulse shadow-lg"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        {listening ? (
          <FaMicrophone className="text-white text-2xl" />
        ) : (
          <FaMicrophoneSlash className="text-gray-700 text-2xl" />
        )}
      </button>

      <p
        className={`text-sm font-medium ${listening ? "text-blue-600" : "text-gray-500"}`}
      >
        {listening ? "Listening..." : "Click the microphone to speak"}
      </p>

      {/* Movement Mode Toggle */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-medium">Mode:</span>
        <button
          onClick={toggleMode}
          className={`px-4 py-1 rounded-full font-light transition ${
            mode === "single"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Single
        </button>
        <button
          onClick={toggleMode}
          className={`px-4 py-1 rounded-full font-semibold transition ${
            mode === "continuous"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Continuous
        </button>
      </div>

      {/* Command Display */}
      <div className="text-center">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Last command:</span>{" "}
          <span className="text-blue-600">{status}</span>
        </p>
      </div>

      {/* Instructions */}
      <div className="text-xs text-gray-600 bg-gray-100 p-4 rounded-lg w-full">
        <p className="font-semibold mb-2">How to use:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Click the microphone button to start listening</li>
          <li>
            Say: <b>forward</b> (grows), <b>backward</b> (shrinks)
          </li>
          <li>
            Say: <b>up</b> or <b>down</b> for vertical movement
          </li>
          <li>
            Say: <b>left</b> or <b>right</b> for horizontal movement
          </li>
          <li>
            Say: <b>dance</b> to perform a dance sequence
          </li>
          <li>
            Say <b>stop</b> to halt continuous movement or dance
          </li>
          <li>
            Select <b>Single</b> or <b>Continuous</b> mode
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Robot;

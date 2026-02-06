// src/component/UIOverlay.jsx
import useRobotVoice from "../voice/useRobotVoice";

export default function UIOverlay({ refs }) {
  const { start, stop, listening, lastCommand } = useRobotVoice(refs);

  // List of commands to display
  const commandsList = [
    "walk",
    "stop",
    "raise hands",
    "lower hands",
    "look left",
    "look right",
    "center",
    "go forward",
    "go backward",
    "go left",
    "go right",
    "run",
    "dance",
    "take a walk",
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <div className="flex h-full flex-col justify-between p-6">

        {/* HEADER */}
        <div className="pointer-events-auto self-start rounded-xl bg-black/70 px-5 py-3 text-white backdrop-blur">
          <h1 className="text-lg font-semibold">Humanoid Robot</h1>
          <p className="text-sm text-cyan-300">Voice Controlled</p>
        </div>

        <div className="pointer-events-auto fixed top-10 right-1 md:right-10 font-mono bg-[#0000005e] backdrop-blur-md rounded-xl p-4 ">
            <h1 className="text-cyan-300 font-light text-lg md:text-2xl">Monoid</h1>
        </div>

        <div className="hidden md:block animate-ping absolute left-50 top-60">
            {lastCommand !== "none" && lastCommand !== "stop" ? ( <p className="text-cyan-100 font-light text-xs"> User is speaking rn...</p> ) : ( <p className="text-red-500 font-light text-xs">User hasn't said a word!!!</p> )}
        </div>
        <div className="hidden md:block animate-ping absolute right-50 top-60">
            {lastCommand !== "none" && lastCommand !== "stop" ? ( <p className="text-cyan-100 font-light text-xs"> User is speaking rn...</p> ) : ( <p className="text-red-500 font-light text-xs">User hasn't said a word!!!</p> )}
        </div>

        {/* CENTER CONTROL */}
        <div className="pointer-events-auto self-center rounded-3xl bg-black/70 px-6 py-8 text-white backdrop-blur flex flex-col items-center gap-4">
          {/* Mic Control */}
          <button
            onClick={listening ? stop : start}
            className={`w-48 py-3 rounded-xl font-semibold transition cursor-pointer ${
              listening ? "bg-red-600" : "bg-emerald-600"
            }`}
          >
            {listening ? "Stop Listening 🎤" : "Start Listening 🎤"}
          </button>

          {/* Last Command */}
          <p className="text-sm font-light">
            Last Command: <span className="font-medium text-cyan-300">{lastCommand}</span>
          </p>

          {/* Command Guide */}
          <div className="text-xs text-gray-300 text-center grid grid-cols-4 sm:grid-cols-7 gap-2">
            {commandsList.map((cmd) => (
              <span key={cmd} className="bg-gray-800/40 px-2 py-1 rounded font-light text-xs md:text-sm">
                {cmd}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

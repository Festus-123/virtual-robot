// src/component/UIOverlay.jsx
import { useState } from "react";
import useRobotVoice from "../voice/useRobotVoice";
import {
  FaMicrophone,
  FaMicrophoneAltSlash,
  FaDropbox,
  FaXbox,
  FaMarker
} from "react-icons/fa";

export default function UIOverlay({ refs }) {
  const { start, stop, listening, lastCommand } = useRobotVoice(refs);
  const [show, setShow] = useState();

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


  if(show) {
    setTimeout(() => setShow(false), 5000)
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <div className="flex h-full flex-col justify-between p-6">
        {/* HEADER */}
        <div className="pointer-events-auto self-start rounded-xl bg-black/70 px-5 py-3 text-white backdrop-blur">
          <h1 className="text-lg font-semibold">Humanoid Robot</h1>
          <p className="text-sm text-cyan-300">Voice Controlled</p>
        </div>

        <div className="pointer-events-auto fixed top-10 right-1 md:right-10 font-mono bg-[#0000005e] backdrop-blur-md rounded-xl p-4 ">
          <h1 className="text-cyan-300 font-light text-lg md:text-2xl">
            Monoid
          </h1>
        </div>

        <div className="hidden md:block animate-ping absolute left-50 top-60">
          {lastCommand !== "none" && lastCommand !== "stop" ? (
            <p className="text-cyan-100 font-light text-xs">
              {" "}
              User is speaking rn...
            </p>
          ) : (
            <p className="text-red-500 font-light text-xs">
              User hasn't said a word!!!
            </p>
          )}
        </div>
        <div className="hidden md:block animate-ping absolute right-50 top-60">
          {lastCommand !== "none" && lastCommand !== "stop" ? (
            <p className="text-cyan-100 font-light text-xs">
              {" "}
              User is speaking rn...
            </p>
          ) : (
            <p className="text-red-500 font-light text-xs">
              User hasn't said a word!!!
            </p>
          )}
        </div>
        <div className="md:hidden absolute right-10 animate-pulse top-60 text-sm font-light text-cyan-300">
          {`${lastCommand}!!!`}
        </div>

        {/* CENTER CONTROL */}
        <div className="relative pointer-events-auto self-center rounded-3xl bg-black/70 px-6 py-8 text-white backdrop-blur flex flex-col items-center gap-4">
          {/* Mic Control */}
          <div className="relative">
            <div
              className={`w-full h-full absolute inset-0 rounded-full p-1 bg-[#ffffff2f] animate-ping ${listening && "animate-pulse"}`}
            />
            <button
              onClick={listening ? stop : start}
              className={` relative p-3 rounded-full font-semibold transition cursor-pointer text-xl flex flex-col items-center justify-center ${
                listening ? "bg-red-600" : "bg-emerald-600"
              }`}
            >
              {listening ? <FaMicrophoneAltSlash /> : <FaMicrophone />}
            </button>
          </div>

          {/* Last Command */}
          <p className="text-sm font-light">
            Last Command:{" "}
            <span className="font-medium text-cyan-300">{lastCommand}</span>
          </p>

          {/* Command Guide */}
          <div className="text-xs text-gray-300 text-center md:grid grid-cols-6 sm:grid-cols-7 gap-2 hidden">
            {commandsList.map((cmd) => (
              <span
                key={cmd}
                className="bg-gray-800/40 px-2 py-1 rounded font-light text-xs md:text-sm"
              >
                {cmd}
              </span>
            ))}
          </div>

        </div>
          {show ? (
            <div className={`pointer-events-auto absolute bg-[#ffffff2d] right-5 bottom-10 md:hidden rounded-full p-2 text-cyan-300 ${show && "text-red-500"} flex flex-col items-center justify-center text-xl hover:bg-[#ffffff4e] cursor-pointer`}>
              <FaMarker onClick={() => setShow(false)}/>
            </div>
          ) : (
            <div className="pointer-events-auto absolute bg-[#ffffff2d] right-5 bottom-10 md:hidden rounded-full p-2 text-cyan-300 flex flex-col items-center justify-center text-xl hover:bg-[#ffffff4e] cursor-pointer">
              <FaDropbox onClick={() => setShow(true)}/>
            </div>
          )}

          {show && (
            <div className="absolute bottom-10 bg-[#0000002d] rounded-xl p-2 text-xs text-gray-300 text-start md:hiden grid grid-cols-1 gap-1">
              {commandsList.map((cmd) => (
                <span
                  key={cmd}
                  className="bg-gray-800/40 px-2 py-1 rounded font-light text-xs md:text-sm md:hidden"
                >
                  {cmd}
                </span>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

import { useRef } from "react";
import Scene from "./scene/Scene";
import UIOverlay from "./component/UIOverlay";

export default function App() {
  // Shared refs
  const refs = {
    torso: useRef(),
    head: useRef(),
    leftArm: useRef(),
    rightArm: useRef(),
    leftLeg: useRef(),
    rightLeg: useRef(),
  };

  return (
    <div className="relative h-screen w-screen bg-linear-to-b from-slate-900 to-black">
      <Scene refs={refs} />
      <UIOverlay refs={refs} />
    </div>
  );
}

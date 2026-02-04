// src/scene/Scene.jsx
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Lights from "./Lights";
import Environment from "./Enviroment";
import Robot from "../robot/Robot";

export default function Scene({ refs }) {
  return (
    <Canvas
      camera={{ position: [0, 4.5, 9], fov: 45 }}
      shadows
      className="absolute inset-0"
    >
      <Suspense fallback={null}>
        <Lights />
        <Environment />
        <Robot refs={refs} />
      </Suspense>
    </Canvas>
  );
}

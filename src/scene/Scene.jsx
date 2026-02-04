import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import Enviroment from "./Enviroment.jsx";
import Robot from "../robot/Robot";

export default function Scene({ refs }) {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 5, 10], fov: 50 }}
    >
      <Lights />
      <Enviroment />
      <Robot refs={refs} />
    </Canvas>
  );
}

// src/robot/Legs.jsx
import { forwardRef } from "react";

const Leg = forwardRef(function Leg({ position }, ref) {
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.4, 1, 0.5]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[0.36, 0.8, 0.46]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      <mesh position={[0, -1.7, 0.2]}>
        <boxGeometry args={[0.6, 0.2, 0.8]} />
        <meshStandardMaterial color="#020617" />
      </mesh>
    </group>
  );
});

export default Leg;

// src/robot/Torso.jsx
import { forwardRef } from "react";

const Torso = forwardRef((props, ref) => {
  return (
    <group ref={ref} position={[0, 1.6, 0]} {...props}>
      {/* Chest */}
      <mesh castShadow>
        <boxGeometry args={[1.4, 1.8, 0.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Core light */}
      <mesh position={[0, 0.3, 0.41]}>
        <boxGeometry args={[0.5, 0.6, 0.05]} />
        <meshStandardMaterial emissive="#38bdf8" color="#38bdf8" />
      </mesh>
    </group>
  );
});

export default Torso;

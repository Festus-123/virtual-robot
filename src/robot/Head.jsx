// src/robot/Head.jsx
import { forwardRef } from "react";

const Head = forwardRef(({ position }, ref) => {
  return (
    <group ref={ref} position={position}>
      {/* Skull */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.2, 0.1, 0.46]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial emissive="#22d3ee" />
      </mesh>
      <mesh position={[0.2, 0.1, 0.46]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial emissive="#22d3ee" />
      </mesh>
    </group>
  );
});

export default Head;

// src/robot/Arms.jsx
import { forwardRef } from "react";

const Arm = forwardRef(function Arm({ position }, ref) {
  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial
          color="#475569"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[0, -1.05, 0]}>
        <boxGeometry args={[0.26, 0.7, 0.26]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[0.35, 0.15, 0.4]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
});

export default Arm;

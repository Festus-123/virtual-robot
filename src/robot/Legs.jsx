import { forwardRef } from "react";

const Legs = forwardRef(({ position }, ref) => {
  return (
    <group ref={ref} position={position}>
      {/* Hip joint */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Thigh */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[0.35, 0.9, 0.35]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.35} />
      </mesh>

      {/* Shin */}
      <mesh position={[0, -1.35, 0]}>
        <boxGeometry args={[0.3, 0.85, 0.3]} />
        <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Foot */}
      <mesh position={[0, -1.8, 0.1]}>
        <boxGeometry args={[0.4, 0.15, 0.7]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
});

export default Legs;

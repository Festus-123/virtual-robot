import { forwardRef } from "react";

const Arms = forwardRef(({ position }, ref) => {
  return (
    <group ref={ref} position={position}>
      {/* Shoulder joint */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      {/* Upper arm */}
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial
          color="#475569"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Forearm */}
      <mesh position={[0, -1.05, 0]}>
        <boxGeometry args={[0.26, 0.7, 0.26]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Hand / palm */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[0.35, 0.15, 0.4]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
});

export default Arms;

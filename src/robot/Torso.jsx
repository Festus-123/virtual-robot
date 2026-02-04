import { forwardRef } from "react";

const Torso = forwardRef((props, ref) => {
  return (
    <group ref={ref} position={[0, 1.2, 0]} {...props}>
      {/* Main chest */}
      <mesh>
        <boxGeometry args={[1.4, 1.6, 0.8]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>

      {/* Chest panel */}
      <mesh position={[0, 0.2, 0.41]}>
        <boxGeometry args={[0.6, 0.6, 0.05]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" />
      </mesh>
    </group>
  );
});

export default Torso;

export default function Legs({ position }) {
  return (
    <group position={position}>
      {/* Hip joint */}
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      {/* Thigh */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[0.35, 1, 0.35]} />
        <meshStandardMaterial
          color="#475569"
          metalness={0.4}
          roughness={0.45}
        />
      </mesh>

      {/* Shin */}
      <mesh position={[0, -1.4, 0]}>
        <boxGeometry args={[0.32, 0.9, 0.32]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Foot */}
      <mesh position={[0, -1.9, 0.15]}>
        <boxGeometry args={[0.5, 0.2, 0.7]} />
        <meshStandardMaterial color="#020617" />
      </mesh>
    </group>
  );
}

export default function Head({ position }) {
  return (
    <group position={position}>
      {/* Head shell */}
      <mesh>
        <boxGeometry args={[0.8, 0.7, 0.8]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Left eye */}
      <mesh position={[-0.2, 0.1, 0.41]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
        />
      </mesh>

      {/* Right eye */}
      <mesh position={[0.2, 0.1, 0.41]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
        />
      </mesh>
    </group>
  );
}

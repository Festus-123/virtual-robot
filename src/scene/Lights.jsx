// src/scene/Lights.jsx
export default function Lights() {
  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.35} />

      {/* Key light */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill light */}
      <directionalLight
        position={[-5, 6, 3]}
        intensity={0.5}
      />

      {/* Rim / back light */}
      <directionalLight
        position={[0, 6, -6]}
        intensity={0.6}
      />
    </>
  );
}

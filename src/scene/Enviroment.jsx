// src/scene/Environment.jsx
export default function Environment() {
  return (
    <>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0a4a55"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Background wall */}
      <mesh position={[0, 5, -6]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial
          color="#384f53"
          roughness={1}
        />
      </mesh>
    </>
  );
}

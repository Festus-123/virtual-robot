import { forwardRef } from "react";

const Head = forwardRef((props, ref) => {
  return (
    <group ref={ref} position={[0, 2.8, 0]} {...props}>
      <mesh>
        <boxGeometry args={[0.8, 0.7, 0.8]} />
        <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.2, 0.1, 0.41]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" />
      </mesh>
      <mesh position={[0.2, 0.1, 0.41]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" />
      </mesh>
    </group>
  );
});

export default Head;

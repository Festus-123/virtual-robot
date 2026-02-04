// src/robot/Robot.jsx
import Torso from "./Torso";
import Head from "./Head";
import Arm from "./Arms";
import Leg from "./Legs";

export default function Robot({ refs }) {
  return (
    <group ref={refs.robot} position={[0, 0, 0]}>
      <Torso ref={refs.torso} />
      <Head ref={refs.head} position={[0, 2.9, 0]} />
      <Arm ref={refs.leftArm} position={[-1.05, 2.4, 0]} />
      <Arm ref={refs.rightArm} position={[1.05, 2.4, 0]} />
      <Leg ref={refs.leftLeg} position={[-0.45, 0.9, 0]} />
      <Leg ref={refs.rightLeg} position={[0.45, 0.9, 0]} />
    </group>
  );
}

// src/robot/Robot.jsx
import { forwardRef } from "react";
import Torso from "./Torso";
import Head from "./Head";
import Arm from "./Arms";
import Leg from "./Legs";

export default forwardRef(function Robot({ refs }, ref) {
  // We now define the body ref to move the whole robot
  return (
    <group ref={refs.body} position={[0, 0, 0]}>
      {/* Torso */}
      <Torso ref={refs.torso} />

      {/* Head */}
      <Head ref={refs.head} position={[0, 2.9, 0]} />

      {/* Arms */}
      <Arm ref={refs.leftArm} position={[-1.05, 2.4, 0]} />
      <Arm ref={refs.rightArm} position={[1.05, 2.4, 0]} mirrored />

      {/* Legs */}
      <Leg ref={refs.leftLeg} position={[-0.45, 0.9, 0]} />
      <Leg ref={refs.rightLeg} position={[0.45, 0.9, 0]} />
    </group>
  );
});

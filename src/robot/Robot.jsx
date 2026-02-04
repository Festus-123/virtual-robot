import Torso from "./Torso";
import Head from "./Head";
import Arm from "./Arms";
import Leg from "./Legs";

export default function Robot({ refs }) {
  const { torso, head, leftArm, rightArm, leftLeg, rightLeg } = refs;

  return (
    <group position={[0, 0, 0]}>
      <Torso ref={torso} />
      <Head ref={head} position={[0, 2.3, 0]} />
      <Arm ref={leftArm} position={[-0.95, 2.1, 0]} />
      <Arm ref={rightArm} position={[0.95, 2.1, 0]} />
      <Leg ref={leftLeg} position={[-0.4, 0.7, 0]} />
      <Leg ref={rightLeg} position={[0.4, 0.7, 0]} />
    </group>
  );
}

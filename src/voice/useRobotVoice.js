import { useEffect, useRef, useState } from "react";

/**
 * useRobotVoice – FINAL + LASTCOMMAND FIXED
 * -----------------------------------
 * Commands:
 * walk, run, take a walk
 * dance
 * go forward / backward / left / right
 * look left / look right
 * center
 * stop (stops mic + motion)
 */

export default function useRobotVoice(refs) {
  /* ===================== REFS ===================== */
  const recognitionRef = useRef(null);
  const motionRef = useRef(null);

  const basePosition = useRef({ x: 0, z: 0 });
  const phaseRef = useRef(0);
  const angleRef = useRef(0);
  const lastProcessedRef = useRef(""); // 🔑 prevents duplicate firing

  /* ===================== STATE ===================== */
  const [listening, setListening] = useState(false);
  const [lastCommand, setLastCommand] = useState("none");

  /* ===================== HELPERS ===================== */
  const safe = (r) => r?.current;

  const stopMotionLoop = () => {
    if (motionRef.current) {
      cancelAnimationFrame(motionRef.current);
      motionRef.current = null;
    }
  };

  const resetRotations = () => {
    Object.values(refs).forEach((r) => {
      if (safe(r)) r.current.rotation.set(0, 0, 0);
    });
  };

  const rememberBasePosition = () => {
    if (!safe(refs.robot)) return;
    basePosition.current.x = refs.robot.current.position.x;
    basePosition.current.z = refs.robot.current.position.z;
  };

  const moveRobot = (dx = 0, dz = 0) => {
    if (!safe(refs.robot)) return;
    refs.robot.current.position.x += dx;
    refs.robot.current.position.z += dz;
  };

  const moveTowards = (tx, tz, speed = 0.05) => {
    if (!safe(refs.robot)) return false;
    const p = refs.robot.current.position;
    const dx = tx - p.x;
    const dz = tz - p.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 0.05) return true;
    p.x += (dx / dist) * speed;
    p.z += (dz / dist) * speed;
    return false;
  };

  /* ===================== STOP ===================== */
  const stopAll = () => {
    stopMotionLoop();
    resetRotations();
    setListening(false);
    recognitionRef.current?.stop();
  };

  /* ===================== WALK ===================== */
  const walk = () => {
    stopMotionLoop();
    rememberBasePosition();
    phaseRef.current = 0;

    const animate = () => {
      phaseRef.current += 0.09;
      const s = Math.sin(phaseRef.current);

      refs.leftLeg.current.rotation.x = s * 0.5;
      refs.rightLeg.current.rotation.x = -s * 0.5;
      refs.leftArm.current.rotation.x = -s * 0.35;
      refs.rightArm.current.rotation.x = s * 0.35;
      refs.head.current.rotation.y = s * 0.15;

      moveRobot(0, -0.02);
      motionRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  /* ===================== RUN ===================== */
  const run = () => {
    stopMotionLoop();
    rememberBasePosition();
    phaseRef.current = 0;

    const animate = () => {
      phaseRef.current += 0.22;
      const s = Math.sin(phaseRef.current);

      refs.leftLeg.current.rotation.x = s * 0.9;
      refs.rightLeg.current.rotation.x = -s * 0.9;
      refs.leftArm.current.rotation.x = -s * 0.8;
      refs.rightArm.current.rotation.x = s * 0.8;
      refs.torso.current.rotation.x = -0.1;

      moveRobot(0, -0.05);
      motionRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  /* ===================== TAKE A WALK ===================== */
const takeAWalk = () => {
  stopMotionLoop();
  rememberBasePosition();

  phaseRef.current = 0;
  angleRef.current = 0;
  const robot = refs.body.current;

  const radius = 2.2;
  const angularSpeed = 0.04;
  const followStrength = 0.18;
  let returning = false;

  const animate = () => {
    phaseRef.current += 0.22;
    const s = Math.sin(phaseRef.current);

    // limb motion
    refs.leftLeg.current.rotation.x = s * 0.5;
    refs.rightLeg.current.rotation.x = -s * 0.5;
    refs.leftArm.current.rotation.x = -s * 0.35;
    refs.rightArm.current.rotation.x = s * 0.35;
    refs.head.current.rotation.y = s * 0.25;
    refs.torso.current.rotation.x = -0.1;


    if (!returning) {
      angleRef.current += angularSpeed;

      const targetX =
        basePosition.current.x + Math.cos(angleRef.current) * radius;
      const targetZ =
        basePosition.current.z + Math.sin(angleRef.current) * radius;

      const dx = targetX - robot.position.x;
      const dz = targetZ - robot.position.z;

      robot.rotation.y = Math.atan2(dx, dz);

      robot.position.x += dx * followStrength;
      robot.position.z += dz * followStrength;

      if (angleRef.current >= Math.PI * 2) returning = true;
    } else {
      const dx = basePosition.current.x - robot.position.x;
      const dz = basePosition.current.z - robot.position.z;

      robot.rotation.y = Math.atan2(dx, dz);

      robot.position.x += dx * 0.15;
      robot.position.z += dz * 0.15;

      if (Math.hypot(dx, dz) < 0.05) {
        robot.position.x = basePosition.current.x;
        robot.position.z = basePosition.current.z;
        resetRotations();
        stopMotionLoop();
        return;
      }
    }
    //   moveRobot(0, -0.05);
    motionRef.current = requestAnimationFrame(animate);
  };

  animate();
};



  /* ===================== DANCE ===================== */
  const dance = () => {
    stopMotionLoop();
    phaseRef.current = 0;

    const animate = () => {
      phaseRef.current += 0.08;
      setTimeout(() => phaseRef.current += 0.09, 2000)
      const s = Math.sin(phaseRef.current);
      const c = Math.cos(phaseRef.current);

      refs.torso.current.rotation.y = s * 0.5;
      refs.head.current.rotation.y = s * 0.4;
      refs.leftArm.current.rotation.z = s * 1.1;
      refs.rightArm.current.rotation.z = -s * 1.1;
      refs.leftLeg.current.rotation.x = c * 0.5;
      refs.rightLeg.current.rotation.x = -c * 0.5;

      motionRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  /* ===================== LOOK ===================== */
  const lookLeft = () => {
    stopMotionLoop();
    refs.head.current.rotation.y = Math.PI / 4;
  };

  const lookRight = () => {
    stopMotionLoop();
    refs.head.current.rotation.y = -Math.PI / 4;
  };

const raiseHands = () => {
  stopMotionLoop();
  refs.leftArm.current.rotation.x = -Math.PI / 2;
  refs.rightArm.current.rotation.x = -Math.PI / 2;
};

const lowerHands = () => {
  stopMotionLoop();
  refs.leftArm.current.rotation.x = 0;
  refs.rightArm.current.rotation.x = 0;
};


  /* ===================== MOVE STEPS ===================== */
const moveSteps = (dx, dz, steps = 40) => {
  stopMotionLoop();
  rememberBasePosition();

  let count = 0;
  phaseRef.current = 0;
  const robot = refs.body.current;

  robot.rotation.y = Math.atan2(dx, dz);

  const stepX = dx / steps;
  const stepZ = dz / steps;

  const animate = () => {
    phaseRef.current += 0.12;
    const s = Math.sin(phaseRef.current);

    refs.leftLeg.current.rotation.x = s * 0.5;
    refs.rightLeg.current.rotation.x = -s * 0.5;
    refs.leftArm.current.rotation.x = -s * 0.35;
    refs.rightArm.current.rotation.x = s * 0.35;
    refs.head.current.rotation.y = s * 0.15;

    robot.position.x += stepX;
    robot.position.z += stepZ;

    count++;
    if (count < steps) {
      motionRef.current = requestAnimationFrame(animate);
    } else {
      resetRotations();
    }
  };

  animate();
};


const goForward = () => moveSteps(0, 2);
const goBackward = () => moveSteps(0, -2);
const goLeft = () => moveSteps(-2, 0);
const goRight = () => moveSteps(2, 0);


  /* ===================== CENTER ===================== */
  const center = () => {
    stopMotionLoop();
    const animate = () => {
      if (!moveTowards(basePosition.current.x, basePosition.current.z))
        motionRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

const jump = () => {
  stopMotionLoop();
  rememberBasePosition();

  const robot = refs.body.current;
  let velocity = 0.18;
  const gravity = 0.018;
  const groundY = robot.position.y;

  const animate = () => {
    robot.position.y += velocity;
    velocity -= gravity;

    // arms up while jumping
    refs.leftArm.current.rotation.x = -Math.PI / 4;
    refs.rightArm.current.rotation.x = -Math.PI / 4;

    if (robot.position.y <= groundY) {
      robot.position.y = groundY;
      resetRotations();
      stopMotionLoop();
      return;
    }

    motionRef.current = requestAnimationFrame(animate);
  };

  animate();
};


  /* ===================== SPEECH ===================== */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (e) => {
      const result = e.results[e.results.length - 1];
      if (!result.isFinal) return; // 🔑 FIX

      const text = result[0].transcript
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .trim();

      if (text === lastProcessedRef.current) return;
      lastProcessedRef.current = text;

      setLastCommand(text);

      if (text.includes("take a walk")) return takeAWalk();
      if (text.includes("walk")) return walk();
      if (text.includes("run")) return run();
      if (text.includes("dance")) return dance();
      if(text.includes("raise hands")) return raiseHands();
      if(text.includes("lower hands")) return lowerHands();
      if(text.includes("monoid")) return jump();
      if (text.includes("look left")) return lookLeft();
      if (text.includes("look right")) return lookRight();
      if (text.includes("forward") || text.includes("come forward"))
        return goForward();
      if (text.includes("backward") || text.includes("go back"))
        return goBackward();
      if (text.includes("go left")) return goLeft();
      if (text.includes("go right")) return goRight();
      if (text.includes("straight")) return center();
      if (text.includes("stop")) return stopAll();
    };

    recognition.onend = () => listening && recognition.start();
    return () => recognition.stop();
  }, [listening]);

  /* ===================== PUBLIC API ===================== */
  const start = () => {
    setListening(true);
    recognitionRef.current?.start();
  };

  return { start, stop: stopAll, listening, lastCommand };
}

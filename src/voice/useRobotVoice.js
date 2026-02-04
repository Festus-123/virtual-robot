import { useRef } from "react";

export default function useRobot() {
  // ===== BODY PART REFS =====
  const leftLeg = useRef(null);
  const rightLeg = useRef(null);
  const leftArm = useRef(null);
  const rightArm = useRef(null);
  const body = useRef(null);

  // ===== INTERVAL REFS (FIX) =====
  const walkInterval = useRef(null);
  const danceInterval = useRef(null);

  // ===== HELPERS =====
  const setTransform = (ref, value) => {
    if (ref.current) ref.current.style.transform = value;
  };

  const clearAll = () => {
    if (walkInterval.current) {
      clearInterval(walkInterval.current);
      walkInterval.current = null;
    }

    if (danceInterval.current) {
      clearInterval(danceInterval.current);
      danceInterval.current = null;
    }
  };

  // ===== BASIC MOVEMENT =====
  const moveForward = () => {
    clearAll();
    setTransform(body, "translateY(-20px)");
  };

  const moveBackward = () => {
    clearAll();
    setTransform(body, "translateY(20px)");
  };

  const turnLeft = () => {
    clearAll();
    setTransform(body, "rotate(-15deg)");
  };

  const turnRight = () => {
    clearAll();
    setTransform(body, "rotate(15deg)");
  };

  const stop = () => {
    clearAll();
    setTransform(body, "none");
    setTransform(leftLeg, "none");
    setTransform(rightLeg, "none");
    setTransform(leftArm, "none");
    setTransform(rightArm, "none");
  };

  // ===== WALKING =====
  const walkForward = () => {
    clearAll();
    let step = false;

    walkInterval.current = setInterval(() => {
      step = !step;

      setTransform(leftLeg, step ? "rotate(20deg)" : "rotate(-10deg)");
      setTransform(rightLeg, step ? "rotate(-10deg)" : "rotate(20deg)");

      setTransform(leftArm, step ? "rotate(-15deg)" : "rotate(15deg)");
      setTransform(rightArm, step ? "rotate(15deg)" : "rotate(-15deg)");

      setTransform(body, "translateY(-2px)");
    }, 300);
  };

  const walkLeft = () => {
    clearAll();
    setTransform(body, "translateX(-20px)");
  };

  const walkRight = () => {
    clearAll();
    setTransform(body, "translateX(20px)");
  };

  // ===== DANCE =====
  const dance = () => {
    clearAll();
    let beat = false;

    danceInterval.current = setInterval(() => {
      beat = !beat;

      setTransform(body, beat ? "rotate(10deg)" : "rotate(-10deg)");
      setTransform(leftArm, beat ? "rotate(60deg)" : "rotate(-20deg)");
      setTransform(rightArm, beat ? "rotate(-60deg)" : "rotate(20deg)");
      setTransform(leftLeg, beat ? "rotate(20deg)" : "rotate(-20deg)");
      setTransform(rightLeg, beat ? "rotate(-20deg)" : "rotate(20deg)");
    }, 400);
  };

  // ===== EXPORT =====
  return {
    refs: {
      leftLeg,
      rightLeg,
      leftArm,
      rightArm,
      body,
    },
    actions: {
      moveForward,
      moveBackward,
      turnLeft,
      turnRight,
      walkForward,
      walkLeft,
      walkRight,
      dance,
      stop,
    },
  };
}

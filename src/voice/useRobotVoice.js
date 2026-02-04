import { useEffect } from "react";
import VoiceController from "./voiceController";

export default function useRobotVoice(refs) {
  useEffect(() => {
    if (!refs) return;

    const commands = {
      walk: () => {
        console.log("Walking!");
        refs.leftLeg.current.rotation.x = 0.5;
        refs.rightLeg.current.rotation.x = -0.5;
      },
      stop: () => {
        console.log("Stopping!");
        refs.leftLeg.current.rotation.x = 0;
        refs.rightLeg.current.rotation.x = 0;
      },
      "raise hand": () => {
        refs.leftArm.current.rotation.x = -1;
        refs.rightArm.current.rotation.x = -1;
      },
      "lower hand": () => {
        refs.leftArm.current.rotation.x = 0;
        refs.rightArm.current.rotation.x = 0;
      },
      "look left": () => {
        refs.head.current.rotation.y = 0.5;
      },
      "look right": () => {
        refs.head.current.rotation.y = -0.5;
      },
      "center head": () => {
        refs.head.current.rotation.y = 0;
      },
    };

    const recognition = VoiceController(commands);

    return () => {
      if (recognition) recognition.stop();
    };
  }, [refs]);
}

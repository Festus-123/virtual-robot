export default function VoiceController(commandsMap) {
  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    console.warn("Web Speech API not supported in this browser");
    return null;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript
      .trim()
      .toLowerCase();
    console.log("Heard:", transcript);

    Object.keys(commandsMap).forEach((cmd) => {
      if (transcript.includes(cmd)) {
        commandsMap[cmd]();
      }
    });

    // Dispatch event to update UI
    const customEvent = new CustomEvent("lastCommand", { detail: transcript });
    window.dispatchEvent(customEvent);
  };

  recognition.onerror = (event) => console.error("Speech recognition error:", event.error);

  recognition.onend = () => recognition.start(); // auto-restart

  recognition.start();

  return recognition;
}

import { useState } from "react";
import "./App.css";
import { DeviceSelector } from "./components/device-selector";
import { FileSelector } from "./components/file-selector";
import { displayRenamePrompt } from "./utils/display-rename-prompt";
import { useKeyboardShortcut } from "./utils/use-keyboard-shortcut";
import { useRecorder } from "./utils/use-recorder";

function SettingsWindow() {
  const [path, setPath] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("default");

  const [windowMessage, setMessage] = useState("");

  const [start, stop, isRecording, lastFilename] = useRecorder({
    path,
    device: selectedDevice,
  });

  const setDevice = (device: string) => setSelectedDevice(device);
  const selectPath = (path: string | string[]) => {
    if (Array.isArray(path)) return;

    setPath(path);
  };

  useKeyboardShortcut("CommandOrControl+Q", () => {
    if (!isRecording) {
      start();
    } else {
      stop();
    }
  });

  return (
    <div className="App">
      <div>Selected folder for recordings: {path}</div>
      <FileSelector
        onChange={selectPath}
        dialogOptions={{ directory: true, multiple: false }}
      />
      <DeviceSelector onChange={setDevice} />

      <button onClick={isRecording ? stop : start}>
        {isRecording ? "Stop" : "Start"} recording
      </button>
      {windowMessage}
    </div>
  );
}

export default SettingsWindow;

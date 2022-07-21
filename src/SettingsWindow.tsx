import { useState } from "react";
import { useNavigate } from "react-router";
import "./App.css";
import { DeviceSelector } from "./components/device-selector";
import { FileSelector } from "./components/file-selector";
import { displayRenamePrompt } from "./utils/display-rename-prompt";
import { useKeyboardShortcut } from "./utils/use-keyboard-shortcut";
import { useRecorder } from "./utils/use-recorder";

function SettingsWindow({ setLastFile }: any) {
  const [path, setPath] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("default");
  const navigate = useNavigate();
  const [windowMessage, setMessage] = useState("");

  const [start, stop, isRecording, lastFilename] = useRecorder({
    path,
    device: selectedDevice,
  });

  const stopWithRenamePrompt = async () => {
    await stop();
    setLastFile({ path, filename: lastFilename });
    displayRenamePrompt(path, lastFilename, navigate);
  };

  const setDevice = (device: string) => setSelectedDevice(device);
  const selectPath = (path: string | string[]) => {
    if (Array.isArray(path)) return;

    setPath(path);
  };

  useKeyboardShortcut("CommandOrControl+Q", () => {
    if (!isRecording) {
      start();
    } else {
      stopWithRenamePrompt();
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

      <button onClick={isRecording ? stopWithRenamePrompt : start}>
        {isRecording ? "Stop" : "Start"} recording
      </button>
      {windowMessage}
    </div>
  );
}

export default SettingsWindow;

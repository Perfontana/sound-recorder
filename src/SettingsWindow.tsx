import { useState } from "react";
import { useNavigate } from "react-router";
import "./App.css";
import { DeviceSelector } from "./components/device-selector";
import { FileSelector } from "./components/file-selector";
import { displayRenamePrompt } from "./utils/display-rename-prompt";
import { useKeyboardShortcut } from "./utils/use-keyboard-shortcut";
import { useRecorder } from "./utils/use-recorder";

function SettingsWindow({
  path,
  setPath,
  selectedDevice,
  setSelectedDevice,
}: any) {
  const navigate = useNavigate();

  const [start, stop, isRecording, lastFilename] = useRecorder({
    path,
    device: selectedDevice,
  });

  const startRecording = () => {
    if (path) start();
  };

  const stopWithRenamePrompt = async () => {
    await stop();
    displayRenamePrompt(path, lastFilename, navigate);
  };

  const selectPath = (path: string | string[]) => {
    if (Array.isArray(path)) return;

    setPath(path);
  };

  useKeyboardShortcut("CommandOrControl+Q", () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopWithRenamePrompt();
    }
  });

  return (
    <div className="settings">
      <div className="settings-row">
        <span className="settings-path">
          {path ? path : "Please select folder"}
        </span>
        <FileSelector
          onChange={selectPath}
          dialogOptions={{ directory: true, multiple: false }}
        />
      </div>
      <DeviceSelector onChange={setSelectedDevice} />

      <button onClick={isRecording ? stopWithRenamePrompt : startRecording}>
        <img
          width={20}
          height={20}
          src={isRecording ? "pause.png" : "start.png"}
        />
      </button>
    </div>
  );
}

export default SettingsWindow;

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import reactLogo from "./assets/react.svg";
import "./App.css";

let isRecording = false;

import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { open } from "@tauri-apps/api/dialog";

function App() {
  const [count, setCount] = useState(0);
  const [path, setPath] = useState("");
  const [devices, setDevices] = useState<{ name: string }[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("default");

  const loadInputDevices = async () => {
    const dev: [] = await invoke("list_input_devices");

    setDevices(dev);
  };

  useEffect(() => {
    loadInputDevices();
  }, []);

  const startRecording = () => {
    isRecording = true;
    invoke("start_recording", {
      path: path + `/${Date.now()}.wav`,
      device: selectedDevice,
    });
  };

  const endRecording = () => {
    isRecording = false;
    invoke("stop_recording");
  };

  useEffect(() => {
    register("CommandOrControl+Q", () => {
      if (!isRecording) {
        startRecording();
      } else {
        endRecording();
      }
    });

    return () => {
      unregister("CommandOrControl+Q");
    };
  }, [path]);

  const selectPath = async () => {
    let filepath = await open({ directory: true, multiple: false });

    if (!filepath || Array.isArray(filepath)) return;

    setPath(filepath);
  };

  return (
    <div className="App">
      <div>Selected folder for recordings: {path}</div>
      <button onClick={() => selectPath()}>Change path</button>
      <select onChange={(e) => setSelectedDevice(e.target.value)}>
        <option value={"default"}>Default</option>
        {devices.map((dev) => (
          <option value={dev.name}>{dev.name}</option>
        ))}
      </select>

      <button onClick={startRecording}>RECORD SONG!!!</button>
      <button onClick={endRecording}>STOP SONG!!!</button>
    </div>
  );
}

export default App;

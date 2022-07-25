import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RenamePrompt } from "./RenamePrompt";
import SettingsWindow from "./SettingsWindow";

export default function App() {
  const [path, setPath] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("default");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SettingsWindow
              path={path}
              setPath={setPath}
              selectedDevice={selectedDevice}
              setSelectedDevice={setSelectedDevice}
            />
          }
        ></Route>
        <Route
          path="/file-rename-prompt/:path/:filename"
          element={<RenamePrompt />}
        ></Route>
      </Routes>
    </Router>
  );
}

import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SettingsWindow from "./SettingsWindow";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SettingsWindow />}></Route>
        <Route
          path="/file-rename-prompt"
          element={(() => {
            return (
              <img
                src="/dancing-cat.gif"
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            );
          })()}
        ></Route>
      </Routes>
    </Router>
  );
}

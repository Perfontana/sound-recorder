import { emit } from "@tauri-apps/api/event";
import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { RenamePrompt } from "./RenamePrompt";
import SettingsWindow from "./SettingsWindow";

export default function App() {
  const [lastFile, setLastFile] = useState();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<SettingsWindow setLastFile={setLastFile} />}
        ></Route>
        <Route
          path="/file-rename-prompt"
          element={<RenamePrompt file={lastFile} />}
        ></Route>
      </Routes>
    </Router>
  );
}

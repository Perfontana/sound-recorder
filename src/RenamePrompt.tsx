import { renameFile } from "@tauri-apps/api/fs";
import { appWindow } from "@tauri-apps/api/window";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const styles: React.CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: "#4a4a4a",
  color: "#d3d3d3",
  display: "inline-block",
  outline: "none",
  border: "none",
  boxSizing: "border-box",
  textAlign: "center",
  fontSize: "24px",
};

const formStyles: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "block",
};

export const RenamePrompt = () => {
  const [newFilename, setNewFilename] = useState("");
  const { path, filename } = useParams();

  const onEnter = async () => {
    if (!path || !filename) return;

    if (!newFilename) appWindow.close();

    const decodedPath = atob(path);
    const decodedFilename = atob(filename);

    await renameFile(
      decodedPath + decodedFilename,
      decodedPath + "/" + newFilename + ".wav"
    );

    appWindow.close();
  };

  const closeOnEscape = (e: any) => {
    if (e.code === "Escape") appWindow.close();
  };

  useEffect(() => {
    window.addEventListener("blur", closeOnEscape);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("blur", closeOnEscape);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <>
      <form onSubmit={onEnter} style={formStyles}>
        <input
          style={styles}
          autoFocus
          type="text"
          value={newFilename}
          onChange={(e) => setNewFilename(e.target.value)}
        />
      </form>
    </>
  );
};

import { renameFile } from "@tauri-apps/api/fs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { sendEvent } from "./utils/windowEvents";

export const RenamePrompt = ({ file }: any) => {
  const [newFilename, setNewFilename] = useState("");
  const navigate = useNavigate();

  const goBack = () => navigate("/");
  const onEnter = async () => {
    sendEvent("log", "any", {
      oldfile: file.path + file.filename,
      newFile: file.path + "/" + newFilename + ".wav",
    });
    await renameFile(
      file.path + file.filename,
      file.path + "/" + newFilename + ".wav"
    );
    goBack();
  };

  useEffect(() => {
    window.addEventListener("blur", goBack);

    return () => {
      window.removeEventListener("blur", goBack);
    };
  }, [goBack]);

  return (
    <>
      <form onSubmit={onEnter}>
        <input
          autoFocus
          type="text"
          value={newFilename}
          onChange={(e) => setNewFilename(e.target.value)}
        />
      </form>
    </>
  );
};

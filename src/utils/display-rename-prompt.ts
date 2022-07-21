import { appWindow, WebviewWindow } from "@tauri-apps/api/window";
import { sendEvent } from "./windowEvents";

export const displayRenamePrompt = async (
  path: string,
  filename: string,
  navigate: any
) => {
  localStorage.setItem("filename", path + filename);
  navigate("/file-rename-prompt");
  await appWindow.setFocus();
  await appWindow.setAlwaysOnTop(true);
};

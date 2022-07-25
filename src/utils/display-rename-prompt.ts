import { LogicalSize, WebviewWindow } from "@tauri-apps/api/window";
import { sendEvent } from "./windowEvents";

export const displayRenamePrompt = async (
  path: string,
  filename: string,
  navigate: any
) => {
  sendEvent("log", "any", {
    path: `/file-rename-prompt/${btoa(path)}/${btoa(filename)}`,
  });

  const window = new WebviewWindow("rename-prompt", {
    url: `/file-rename-prompt/${btoa(path)}/${btoa(filename)}`,
    decorations: false,
    center: true,
    focus: true,
    alwaysOnTop: true,
    height: 50,
    width: 800,
  });
};

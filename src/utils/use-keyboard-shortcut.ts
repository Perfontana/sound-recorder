import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { useEffect } from "react";

export const useKeyboardShortcut = (shortcut: string, cb: () => void) => {
  useEffect(() => {
    register(shortcut, cb);

    return () => {
      unregister(shortcut);
    };
  }, [cb, shortcut]);
};

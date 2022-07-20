import { invoke } from "@tauri-apps/api/tauri";

const START_RECORDING_COMMAND = "start_recording";
const END_RECORDING_COMMAND = "stop_recording";

export const startRecording = async (
  path: string,
  device: string = "default"
) =>
  await invoke(START_RECORDING_COMMAND, {
    path,
    device,
  });

export const endRecording = async () => await invoke(END_RECORDING_COMMAND);

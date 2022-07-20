import { invoke } from "@tauri-apps/api";

const LIST_INPUT_DEVICES_COMMAND = "list_input_devices";

export interface Device {
  name: string;
}

export const loadInputDevices = async (): Promise<Device[]> =>
  await invoke(LIST_INPUT_DEVICES_COMMAND);

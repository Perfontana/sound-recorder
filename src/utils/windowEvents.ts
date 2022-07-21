import { Event, listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";

const SEND_EVENT_COMMAND = "send_message";

export const sendEvent = async <P>(
  eventName: string,
  windowLabel: string,
  payload: P
) =>
  await invoke(SEND_EVENT_COMMAND, {
    event: eventName,
    window: windowLabel,
    payload: JSON.stringify(payload),
  });

export const listenEvent = async <P>(
  eventName: string,
  cb: (payload: Event<P>) => void
) => {
  return listen<string>(eventName, (data) => {
    cb({ ...data, payload: JSON.parse(data.payload) });
  });
};

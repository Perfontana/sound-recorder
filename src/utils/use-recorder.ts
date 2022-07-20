import { useState } from "react";
import { notify } from "./notifications";
import { endRecording, startRecording } from "./recorder";
import moment from "moment";
import { createRecordingFilename } from "./createRecordingFilename";

export interface UseRecorderParams {
  path: string;
  device: string;
}

export const useRecorder = ({
  path,
  device,
}: UseRecorderParams): [
  () => Promise<void>,
  () => Promise<void>,
  boolean,
  string
] => {
  const [isRecording, setIsRecording] = useState(false);
  const [lastFilename, setLastFilename] = useState("");

  const start = async () => {
    setIsRecording(true);
    const filename = createRecordingFilename();
    setLastFilename(filename);
    startRecording(path + filename, device);
    notify("Recording started!");
  };

  const stop = async () => {
    setIsRecording(false);
    endRecording();
    notify("Recording ended!");
  };

  return [start, stop, isRecording, lastFilename];
};

import moment from "moment";

const DATE_FORMAT = "[Recorder] YYYY-MM-DD hh-mm-ss";

export const createRecordingFilename = () =>
  `/${moment().format(DATE_FORMAT)}.wav`;

import { open, OpenDialogOptions } from "@tauri-apps/api/dialog";

export interface FileSelectorProps {
  onChange: (path: string | string[]) => void;
  dialogOptions: OpenDialogOptions;
}

export const FileSelector = ({
  onChange,
  dialogOptions,
}: FileSelectorProps) => {
  const selectPath = async () => {
    let filepath = await open(dialogOptions);

    if (!filepath) return;

    onChange(filepath);
  };

  return <button onClick={selectPath}>Change path</button>;
};

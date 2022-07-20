import { useEffect, useState } from "react";
import { Device, loadInputDevices } from "../utils/devices";

export interface DeviceSelectorProps {
  onChange: (value: string) => void;
}

export const DeviceSelector = ({ onChange }: DeviceSelectorProps) => {
  const [devices, setDevices] = useState<Device[]>([]);

  const loadOptions = async () => {
    const dev = await loadInputDevices();

    setDevices(dev);
  };

  useEffect(() => {
    loadOptions();
  }, []);

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value={"default"}>Default</option>
      {devices.map((dev) => (
        <option value={dev.name}>{dev.name}</option>
      ))}
    </select>
  );
};

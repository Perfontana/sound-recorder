use cpal::traits::{DeviceTrait, HostTrait};

#[derive(serde::Serialize)]
pub struct AudioDevice {
    pub name: String,
}

#[tauri::command]
pub fn list_input_devices() -> Vec<AudioDevice> {
    let host = crate::host::get_host();

    let devices_result = host.input_devices();

    if let Result::Ok(devices) = devices_result {
        devices
            .map(|dev| AudioDevice {
                name: dev.name().unwrap(),
            })
            .collect()
    } else {
        vec![]
    }
}

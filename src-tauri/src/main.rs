#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::sync::Mutex;

use recorder_interface::{State, StateGuard};
use system_tray::{handle_tray_event, make_tray};

pub mod audio_device_interface;
pub mod host;
pub mod recorder;
pub mod recorder_interface;
pub mod system_tray;

fn main() {
    tauri::Builder::default()
        .system_tray(make_tray())
        .on_system_tray_event(handle_tray_event)
        .manage(StateGuard(Mutex::new(State::new())))
        .invoke_handler(tauri::generate_handler![
            recorder_interface::start_recording,
            recorder_interface::stop_recording,
            audio_device_interface::list_input_devices
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

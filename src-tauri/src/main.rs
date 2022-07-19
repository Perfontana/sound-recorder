#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::sync::Mutex;

use recorder_interface::{State, StateGuard};

pub mod recorder;
pub mod recorder_interface;

fn main() {
    tauri::Builder::default()
        .manage(StateGuard(Mutex::new(State::new())))
        .invoke_handler(tauri::generate_handler![
            recorder_interface::start_recording,
            recorder_interface::stop_recording
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

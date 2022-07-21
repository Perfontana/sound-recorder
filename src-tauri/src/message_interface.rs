use tauri::Manager;

#[tauri::command]
pub fn send_message(event: String, window: String, payload: String, app: tauri::AppHandle) -> () {
    println!(
        "Received {:?} event with payload {:?} to window {:?}",
        event, payload, window
    );

    app.emit_all(&event, payload);

    ()
}

use std::{
    fs::File,
    io::BufWriter,
    sync::{Arc, Mutex},
};

use cpal::Stream;
use hound::WavWriter;

#[tauri::command]
pub fn start_recording(
    path: String,
    device: String,
    state: tauri::State<'_, StateGuard<State>>,
) -> () {
    let mut recorder = state.0.lock().unwrap();

    println!("{:?} recording, device {:?}", path, device);

    recorder.start(path.clone(), device.clone());

    ()
}

#[tauri::command]
pub fn stop_recording(state: tauri::State<'_, StateGuard<State>>) -> () {
    let mut recorder = state.0.lock().unwrap();

    recorder.stop();

    println!("{:?} recording", recorder.is_recording);
    ()
}

pub struct StateGuard<T>(pub Mutex<T>);

pub struct State {
    is_recording: bool,
    stream: Option<Stream>,
    writer: Option<Arc<Mutex<Option<WavWriter<BufWriter<File>>>>>>,
}

unsafe impl Send for State {}

impl State {
    pub fn new() -> State {
        State {
            is_recording: false,
            stream: None,
            writer: None,
        }
    }

    pub fn start(&mut self, path: String, device: String) {
        if self.is_recording {
            ()
        }

        let (writer, stream) =
            crate::recorder::record(crate::recorder::Opt { device, path }).unwrap();

        self.stream = Some(stream);
        self.writer = Some(writer);
        self.is_recording = true;
    }

    pub fn stop(&mut self) -> () {
        if !self.is_recording {
            ()
        }

        self.drop_stream();

        self.finalize_writer();

        self.is_recording = false;
    }

    fn drop_stream(&mut self) -> () {
        let stream = self.stream.as_ref().unwrap();
        drop(stream);
        self.stream = None;
    }

    fn finalize_writer(&mut self) -> () {
        let writer = self
            .writer
            .as_deref()
            .unwrap()
            .lock()
            .unwrap()
            .take()
            .unwrap();

        writer.finalize().expect("Writer finalize");

        self.writer = None;
    }
}

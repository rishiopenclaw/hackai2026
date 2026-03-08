import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const RECORDING_OPTIONS = {
  isMeteringEnabled: true,
  android: {
    extension: '.m4a',
    outputFormat: Audio.AndroidOutputFormat.MPEG_4,
    audioEncoder: Audio.AndroidAudioEncoder.AAC,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: '.m4a',
    outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
    audioQuality: Audio.IOSAudioQuality.HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
};

let _currentRecording = null;

export async function requestMicPermission() {
  const { status } = await Audio.requestPermissionsAsync();
  return status === 'granted';
}

export async function getMicPermissionStatus() {
  const { status } = await Audio.getPermissionsAsync();
  return status;
}

export async function startRecording() {
  if (_currentRecording) {
    try { await _currentRecording.stopAndUnloadAsync(); } catch {}
    _currentRecording = null;
  }

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  const { recording } = await Audio.Recording.createAsync(RECORDING_OPTIONS);
  _currentRecording = recording;
  return recording;
}

export async function stopRecording() {
  if (!_currentRecording) return null;

  const recording = _currentRecording;
  _currentRecording = null;

  try {
    await recording.stopAndUnloadAsync();
  } catch {}

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
  });

  const uri = recording.getURI();
  if (!uri) return null;

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return {
    uri,
    audioBase64: base64,
    mimeType: 'audio/mp4',
  };
}

export function isRecording() {
  return _currentRecording !== null;
}

export async function cancelRecording() {
  if (!_currentRecording) return;
  try { await _currentRecording.stopAndUnloadAsync(); } catch {}
  _currentRecording = null;
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
  });
}

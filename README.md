# hackai2026

Switched to **React Native (Expo)** implementation for faster cross-device development.

## Run

```bash
cd react-native-speakarena
npm install
npm run start
```

Then press:
- `i` for iOS simulator (if available)
- `a` for Android
- `w` for web preview
- or scan QR via Expo Go

## What’s implemented

- Duolingo-style design system (vibrant palette, chunky button, rounded cards)
- Bottom tab navigation: Path / Arena / Drills / Profile
- Learning Path home screen (zig-zag nodes, hearts, streak, XP progress)
- Arena screen (topic card, split players, pulsing mic, timer, transcript box)
- Mascot component (`Chirp`) in clean vector style

## Structure

```text
react-native-speakarena/
  src/
    App.js
    theme/colors.js
    components/
    screens/
    data/mock.js
```

## Next

- Wire real mic/transcription (`expo-av` + `expo-speech` / backend STT)
- Add live P2P via WebRTC
- Add XP/streak persistence (Supabase/Firebase)

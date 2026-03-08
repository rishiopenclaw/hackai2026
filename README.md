# hackai2026

SpeakArena iOS scaffold (SwiftUI, MVVM) for a Duolingo-inspired speaking + debate trainer.

## Implemented

- Core data models (`User`, `SpeakingModule`, `DebateSession`, `PerformanceMetrics`)
- Design system primitives
  - vibrant color tokens
  - rounded typography tokens
  - `DuolingoButtonModifier` (chunky 3D press)
  - animated `ProgressBar`
  - haptics utility
- App shell
  - bottom `TabView`
  - Home learning path with node UI
  - Arena (P2P debate) screen with timer + pulsing mic + transcript panel
  - Drills/Profile placeholders
- Mascot component
  - `ChirpMascotView` + bubble helper

## Folder map

```text
SpeakArena/
  App/
  Core/DesignSystem/
  Features/
    HomePath/
    Debate/
    Drills/
    Profile/
  Models/
  Mock/
```

## Next Build Steps

1. Add Xcode iOS App target and include all files under `SpeakArena/`.
2. Wire `AVFoundation` recording + meter levels to `PulsingMicView`.
3. Wire `Speech` framework to replace mocked transcript.
4. Add backend adapter protocols (Supabase/Firebase/WebRTC).
5. Add mascot variants (Spark/Echo), expression states, and dark-mode tuned palettes.

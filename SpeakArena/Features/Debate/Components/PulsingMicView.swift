import SwiftUI

struct PulsingMicView: View {
    @State private var pulse = false
    let active: Bool

    var body: some View {
        ZStack {
            Circle()
                .fill(active ? Color.arenaGreen.opacity(0.25) : Color.gray.opacity(0.2))
                .frame(width: 110, height: 110)
                .scaleEffect(pulse ? 1.15 : 0.9)
                .animation(active ? .easeInOut(duration: 0.8).repeatForever(autoreverses: true) : .default, value: pulse)
            Circle()
                .fill(active ? Color.arenaGreen : Color.gray)
                .frame(width: 78, height: 78)
                .overlay(Image(systemName: "mic.fill").font(.title2).foregroundStyle(.white))
        }
        .onAppear { pulse = true }
    }
}

import SwiftUI

struct ChirpMascotView: View {
    var size: CGFloat = 120

    var body: some View {
        ZStack {
            Circle().fill(Color.arenaGreen).frame(width: size, height: size)
            Circle().fill(Color.white.opacity(0.95)).frame(width: size * 0.58, height: size * 0.52).offset(y: size * 0.16)
            Circle().fill(Color.black.opacity(0.85)).frame(width: size * 0.08, height: size * 0.08).offset(x: -size * 0.14, y: -size * 0.08)
            Circle().fill(Color.black.opacity(0.85)).frame(width: size * 0.08, height: size * 0.08).offset(x: size * 0.14, y: -size * 0.08)
            Capsule().fill(Color.arenaOrange).frame(width: size * 0.22, height: size * 0.1).offset(y: size * 0.03)
            RoundedRectangle(cornerRadius: 8, style: .continuous)
                .fill(Color.arenaBlue)
                .frame(width: size * 0.24, height: size * 0.2)
                .offset(x: size * 0.36, y: size * 0.05)
                .overlay(Image(systemName: "mic.fill").font(.system(size: size * 0.08)).foregroundStyle(.white).offset(x: size * 0.36, y: size * 0.05))
        }
    }
}

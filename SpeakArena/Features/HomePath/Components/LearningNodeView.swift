import SwiftUI

struct LearningNodeView: View {
    let module: SpeakingModule
    let tap: () -> Void

    private var color: Color {
        switch module.status {
        case .completed: return .arenaGreen
        case .available: return .arenaBlue
        case .locked: return .gray.opacity(0.5)
        }
    }

    var body: some View {
        Button(action: tap) {
            VStack(spacing: 8) {
                ZStack {
                    Circle().fill(color.opacity(0.25)).frame(width: 92, height: 92)
                    Circle().fill(color).frame(width: 78, height: 78)
                    Image(systemName: icon)
                        .font(.system(size: 28, weight: .bold))
                        .foregroundStyle(.white)
                }
                Text(module.title)
                    .font(.arenaCaption)
                    .foregroundStyle(.arenaTextPrimary)
                Text(module.subtitle)
                    .font(.caption2)
                    .foregroundStyle(.arenaTextSecondary)
            }
            .padding(.vertical, 4)
        }
        .buttonStyle(.plain)
    }

    private var icon: String {
        switch module.type {
        case .p2pDebate: return "person.2.fill"
        case .aiSparring: return "brain.head.profile"
        case .elevatorPitch: return "sparkles"
        case .articulationDrill: return "waveform"
        }
    }
}

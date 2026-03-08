import SwiftUI

struct MascotBubbleView: View {
    @State private var bob = false

    var body: some View {
        HStack(spacing: 10) {
            ChirpMascotView(size: 34)
                .offset(y: bob ? -2 : 2)
                .animation(.spring(response: 0.8, dampingFraction: 0.6).repeatForever(), value: bob)
                .onAppear { bob = true }
            Text("You got this")
                .font(.arenaCaption)
                .foregroundStyle(.arenaTextPrimary)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(.white, in: Capsule())
    }
}

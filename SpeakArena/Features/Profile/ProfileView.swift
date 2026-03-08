import SwiftUI

struct ProfileView: View {
    var body: some View {
        VStack(spacing: 16) {
            ChirpMascotView(size: 84)
            Text("Profile")
                .font(.arenaHeading)
            Text("XP history, streak milestones, and analytics timeline go here.")
                .font(.arenaBody)
                .foregroundStyle(.arenaTextSecondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.arenaBG.ignoresSafeArea())
    }
}

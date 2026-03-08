import SwiftUI

struct DrillsView: View {
    var body: some View {
        VStack(spacing: 16) {
            ChirpMascotView(size: 90)
            Text("Articulation Drills")
                .font(.arenaHeading)
            Text("Shadowing, pacing, and filler-reduction drills plug in here.")
                .font(.arenaBody)
                .foregroundStyle(.arenaTextSecondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.arenaBG.ignoresSafeArea())
    }
}

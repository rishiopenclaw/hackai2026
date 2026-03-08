import SwiftUI

struct P2PDebateView: View {
    @StateObject var viewModel: P2PDebateViewModel

    var body: some View {
        NavigationStack {
            VStack(spacing: 14) {
                Text("Arena")
                    .font(.arenaTitle)
                    .frame(maxWidth: .infinity, alignment: .leading)

                Text(viewModel.session.topicPrompt)
                    .font(.arenaBody)
                    .padding()
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.white, in: RoundedRectangle(cornerRadius: 24, style: .continuous))

                HStack(spacing: 12) {
                    speakerCard(name: "You", active: viewModel.isUserSpeaking, color: .arenaGreen)
                    speakerCard(name: "Opponent", active: !viewModel.isUserSpeaking, color: .arenaPurple)
                }

                HStack {
                    Text("Time")
                    Spacer()
                    Text("\(viewModel.secondsLeft)s")
                        .font(.arenaHeading)
                }
                .font(.arenaBody)

                ProgressBar(progress: Double(viewModel.secondsLeft) / 60, fill: .arenaOrange)

                VStack(alignment: .leading, spacing: 8) {
                    Label("Live Transcript", systemImage: "captions.bubble.fill")
                        .font(.arenaBody)
                    Text(viewModel.transcript)
                        .font(.body)
                        .foregroundStyle(.arenaTextSecondary)
                        .frame(maxWidth: .infinity, minHeight: 120, alignment: .topLeading)
                        .padding()
                        .background(Color.white, in: RoundedRectangle(cornerRadius: 20, style: .continuous))
                }

                Button("End Turn") {
                    viewModel.advanceTurn()
                }
                .buttonStyle(DuolingoButtonModifier(fill: .arenaBlue, base: .arenaPurple))
            }
            .padding()
            .background(Color.arenaBG.ignoresSafeArea())
            .onAppear { viewModel.startTimer() }
        }
    }

    private func speakerCard(name: String, active: Bool, color: Color) -> some View {
        VStack(spacing: 10) {
            Text(name).font(.arenaBody)
            PulsingMicView(active: active)
            Text(active ? "Speaking" : "Waiting")
                .font(.arenaCaption)
                .foregroundStyle(active ? color : .gray)
        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(Color.white, in: RoundedRectangle(cornerRadius: 24, style: .continuous))
    }
}

import SwiftUI

struct HomePathView: View {
    @EnvironmentObject private var appState: AppState
    @StateObject var viewModel: HomePathViewModel

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 22) {
                    topBar
                    xpCard

                    ForEach(Array(viewModel.modules.enumerated()), id: \.element.id) { index, module in
                        HStack {
                            if index.isMultiple(of: 2) { Spacer() }
                            LearningNodeView(module: module) {
                                Haptics.light()
                            }
                            if !index.isMultiple(of: 2) { Spacer() }
                        }
                    }
                }
                .padding()
            }
            .background(Color.arenaBG.ignoresSafeArea())
            .navigationTitle("Learning Path")
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    private var topBar: some View {
        HStack(spacing: 14) {
            Label("\(appState.user.hearts)", systemImage: "heart.fill")
                .font(.arenaBody)
                .foregroundStyle(.red)
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(.white, in: Capsule())

            Label("\(appState.user.streakDays)", systemImage: "flame.fill")
                .font(.arenaBody)
                .foregroundStyle(.arenaOrange)
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(.white, in: Capsule())

            Spacer()
            MascotBubbleView()
        }
    }

    private var xpCard: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Level \(appState.user.level) • \(appState.user.xp) XP")
                .font(.arenaHeading)
                .foregroundStyle(.arenaTextPrimary)
            ProgressBar(progress: 0.68, fill: .arenaPurple)
        }
        .padding(16)
        .background(.white, in: RoundedRectangle(cornerRadius: 24, style: .continuous))
    }
}

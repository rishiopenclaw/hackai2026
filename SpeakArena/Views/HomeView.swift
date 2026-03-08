import SwiftUI
import Combine

/// Home screen displaying a vertical learning path of speaking modules.
struct HomeView: View {
    @StateObject private var viewModel = HomeViewModel()
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    ForEach(viewModel.modules) { module in
                        NavigationLink(destination: Text("Module \(module.title) placeholder")) {
                            ModuleNodeView(module: module)
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("SpeakArena")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    HStack(spacing: 12) {
                        Image(systemName: "flame.fill")
                            .foregroundColor(.orange)
                        Text("\(viewModel.streak)🔥")
                            .foregroundColor(.primary)
                    }
                }
            }
        }
        .accentColor(.primaryGreen)
    }
}

/// Visual node for a speaking module.
struct ModuleNodeView: View {
    let module: SpeakingModule
    
    var body: some View {
        HStack(spacing: 16) {
            Circle()
                .fill(module.isLocked ? Color.gray.opacity(0.3) : Color.primaryGreen)
                .frame(width: 48, height: 48)
                .overlay(
                    Image(systemName: module.iconName ?? "questionmark.circle")
                        .foregroundColor(.white)
                )
            VStack(alignment: .leading, spacing: 4) {
                Text(module.title)
                    .font(SpeakArenaFont.headline())
                    .foregroundColor(.primaryText)
                if let desc = module.description {
                    Text(desc)
                        .font(SpeakArenaFont.caption())
                        .foregroundColor(.secondary)
                }
                ProgressBar(progress: module.progress)
                    .frame(height: 8)
            }
            Spacer()
        }
        .padding()
        .background(Color.backgroundLight)
        .cornerRadius(24, style: .continuous)
        .shadow(color: Color.black.opacity(0.1), radius: 2, x: 0, y: 1)
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
            .preferredColorScheme(.light)
    }
}

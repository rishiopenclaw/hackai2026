import SwiftUI

@main
struct SpeakArenaApp: App {
    @StateObject private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            RootTabView()
                .environmentObject(appState)
                .preferredColorScheme(nil)
        }
    }
}

final class AppState: ObservableObject {
    @Published var user: User = MockData.user
    @Published var modules: [SpeakingModule] = MockData.modules
}

import Foundation

@MainActor
final class HomePathViewModel: ObservableObject {
    @Published var modules: [SpeakingModule] = MockData.modules

    func isUnlocked(_ module: SpeakingModule) -> Bool {
        module.status != .locked
    }
}

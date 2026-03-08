import Foundation
import Combine

/// ViewModel for the Home screen, providing a list of speaking modules.
class HomeViewModel: ObservableObject {
    @Published var modules: [SpeakingModule] = []
    @Published var streak: Int = 0
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        loadModules()
        // Stub streak value – replace with real user data later
        streak = 7
    }
    
    private func loadModules() {
        // In a real app this would fetch from the backend API.
        // Here we provide a static list for demo purposes.
        let sampleModules = [
            SpeakingModule(id: UUID(), title: "Warm‑up", description: "Basic articulation drill", iconName: "mic", isLocked: false, requiredLevel: 1, progress: 0.8),
            SpeakingModule(id: UUID(), title: "Debate Intro", description: "Learn debate basics", iconName: "bubble.left.and.bubble.right", isLocked: true, requiredLevel: 2, progress: 0.0),
            SpeakingModule(id: UUID(), title: "Elevator Pitch", description: "Impromptu speaking", iconName: "lightbulb", isLocked: true, requiredLevel: 3, progress: 0.0)
        ]
        modules = sampleModules
    }
}

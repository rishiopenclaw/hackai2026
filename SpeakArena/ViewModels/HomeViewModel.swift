import Foundation
import Combine

class HomeViewModel: ObservableObject {
    @Published var modules: [SpeakingModule] = []
    @Published var streak: Int = 3
    @Published var hearts: Int = 5
    
    init() {
        loadMockData()
    }
    
    private func loadMockData() {
        modules = [
            SpeakingModule(
                id: "1",
                title: "Ice Breakers",
                description: "Basic introductions",
                iconName: "hand.wave.fill",
                isLocked: false,
                requiredLevel: .beginner,
                progress: 1.0
            ),
            SpeakingModule(
                id: "2",
                title: "Small Talk",
                description: "Casual conversation",
                iconName: "bubble.left.and.bubble.right.fill",
                isLocked: false,
                requiredLevel: .beginner,
                progress: 0.6
            ),
            SpeakingModule(
                id: "3",
                title: "Debate Basics",
                description: "Stating your claim",
                iconName: "person.2.fill",
                isLocked: true,
                requiredLevel: .intermediate,
                progress: 0.0
            ),
            SpeakingModule(
                id: "4",
                title: "Elevator Pitch",
                description: "Sell your idea in 30s",
                iconName: "briefcase.fill",
                isLocked: true,
                requiredLevel: .advanced,
                progress: 0.0
            )
        ]
    }
}

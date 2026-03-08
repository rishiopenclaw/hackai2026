import Foundation

enum MockData {
    static let user = User(displayName: "Rishi", xp: 1240, level: 8, streakDays: 13, hearts: 4, maxHearts: 5, skillLevel: .contender)

    static let modules: [SpeakingModule] = [
        .init(title: "Warmup Echo", subtitle: "Articulation", type: .articulationDrill, pathIndex: 0, status: .completed, xpReward: 20, estimatedDurationSeconds: 30),
        .init(title: "Elevator Sparks", subtitle: "Impromptu", type: .elevatorPitch, pathIndex: 1, status: .completed, xpReward: 30, estimatedDurationSeconds: 60),
        .init(title: "Sparring Partner", subtitle: "AI Debate", type: .aiSparring, pathIndex: 2, status: .available, xpReward: 40, estimatedDurationSeconds: 180),
        .init(title: "The Arena", subtitle: "Live P2P", type: .p2pDebate, pathIndex: 3, status: .available, xpReward: 60, estimatedDurationSeconds: 240),
        .init(title: "Precision Drill", subtitle: "Shadowing", type: .articulationDrill, pathIndex: 4, status: .locked, requiredXP: 1500, xpReward: 35, estimatedDurationSeconds: 30)
    ]
}

import Foundation

enum SkillLevel: String, Codable, CaseIterable, Identifiable {
    case rookie
    case challenger
    case contender
    case orator
    case master

    var id: String { rawValue }
}

enum ModuleType: String, Codable, CaseIterable, Identifiable {
    case p2pDebate = "p2p_debate"
    case aiSparring = "ai_sparring"
    case elevatorPitch = "elevator_pitch"
    case articulationDrill = "articulation_drill"

    var id: String { rawValue }
}

enum ModuleStatus: String, Codable, CaseIterable, Identifiable {
    case locked
    case available
    case completed

    var id: String { rawValue }
}

enum DebateSessionMode: String, Codable, CaseIterable, Identifiable {
    case p2p
    case ai

    var id: String { rawValue }
}

enum DebatePhase: String, Codable, CaseIterable, Identifiable {
    case waiting
    case openingA
    case openingB
    case rebuttalA
    case rebuttalB
    case analysis
    case completed

    var id: String { rawValue }
}

enum SessionParticipantRole: String, Codable, CaseIterable, Identifiable {
    case speakerA
    case speakerB
    case aiOpponent

    var id: String { rawValue }
}

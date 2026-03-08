import Foundation

struct DebateTurn: Identifiable, Codable, Hashable {
    let id: UUID
    let role: SessionParticipantRole
    let phase: DebatePhase
    let allocatedSeconds: Int
    var startedAt: Date?
    var endedAt: Date?
    var transcript: String

    init(
        id: UUID = UUID(),
        role: SessionParticipantRole,
        phase: DebatePhase,
        allocatedSeconds: Int,
        startedAt: Date? = nil,
        endedAt: Date? = nil,
        transcript: String = ""
    ) {
        self.id = id
        self.role = role
        self.phase = phase
        self.allocatedSeconds = allocatedSeconds
        self.startedAt = startedAt
        self.endedAt = endedAt
        self.transcript = transcript
    }
}

struct DebateSession: Identifiable, Codable, Hashable {
    let id: UUID
    var mode: DebateSessionMode
    var topicPrompt: String
    var createdAt: Date
    var startedAt: Date?
    var endedAt: Date?

    // Participants
    var speakerAUserID: UUID
    var speakerBUserID: UUID? // nil when AI opponent
    var aiOpponentName: String?

    // State machine
    var currentPhase: DebatePhase
    var turns: [DebateTurn]

    // Live transcription (per role)
    var liveTranscriptByRole: [SessionParticipantRole: String]

    // Post-session metrics
    var performanceByUserID: [UUID: PerformanceMetrics]

    init(
        id: UUID = UUID(),
        mode: DebateSessionMode,
        topicPrompt: String,
        createdAt: Date = .now,
        startedAt: Date? = nil,
        endedAt: Date? = nil,
        speakerAUserID: UUID,
        speakerBUserID: UUID? = nil,
        aiOpponentName: String? = nil,
        currentPhase: DebatePhase = .waiting,
        turns: [DebateTurn] = [],
        liveTranscriptByRole: [SessionParticipantRole: String] = [:],
        performanceByUserID: [UUID: PerformanceMetrics] = [:]
    ) {
        self.id = id
        self.mode = mode
        self.topicPrompt = topicPrompt
        self.createdAt = createdAt
        self.startedAt = startedAt
        self.endedAt = endedAt
        self.speakerAUserID = speakerAUserID
        self.speakerBUserID = speakerBUserID
        self.aiOpponentName = aiOpponentName
        self.currentPhase = currentPhase
        self.turns = turns
        self.liveTranscriptByRole = liveTranscriptByRole
        self.performanceByUserID = performanceByUserID
    }
}

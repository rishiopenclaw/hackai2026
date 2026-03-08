import Foundation

struct PerformanceMetrics: Identifiable, Codable, Hashable {
    let id: UUID
    let sessionID: UUID
    let userID: UUID
    let capturedAt: Date

    // Speech quality
    var wordsPerMinute: Double
    var fillerWordCount: Int
    var fillerWords: [String: Int] // e.g. ["um": 6, "uh": 3]
    var vocabularyDiversityScore: Double // 0...100
    var articulationScore: Double // 0...100
    var confidenceScore: Double // 0...100

    // Timing + structure
    var averagePauseDurationMs: Double
    var longestPauseDurationMs: Double
    var onTimeCompletionRate: Double // 0...1

    // AI feedback
    var strengths: [String]
    var improvements: [String]
    var suggestedDrills: [ModuleType]

    init(
        id: UUID = UUID(),
        sessionID: UUID,
        userID: UUID,
        capturedAt: Date = .now,
        wordsPerMinute: Double = 0,
        fillerWordCount: Int = 0,
        fillerWords: [String: Int] = [:],
        vocabularyDiversityScore: Double = 0,
        articulationScore: Double = 0,
        confidenceScore: Double = 0,
        averagePauseDurationMs: Double = 0,
        longestPauseDurationMs: Double = 0,
        onTimeCompletionRate: Double = 0,
        strengths: [String] = [],
        improvements: [String] = [],
        suggestedDrills: [ModuleType] = []
    ) {
        self.id = id
        self.sessionID = sessionID
        self.userID = userID
        self.capturedAt = capturedAt
        self.wordsPerMinute = wordsPerMinute
        self.fillerWordCount = fillerWordCount
        self.fillerWords = fillerWords
        self.vocabularyDiversityScore = vocabularyDiversityScore
        self.articulationScore = articulationScore
        self.confidenceScore = confidenceScore
        self.averagePauseDurationMs = averagePauseDurationMs
        self.longestPauseDurationMs = longestPauseDurationMs
        self.onTimeCompletionRate = onTimeCompletionRate
        self.strengths = strengths
        self.improvements = improvements
        self.suggestedDrills = suggestedDrills
    }
}

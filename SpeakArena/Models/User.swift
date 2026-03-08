import Foundation

struct User: Identifiable, Codable, Hashable {
    let id: UUID
    var displayName: String
    var avatarURL: URL?

    // Gamification
    var xp: Int
    var level: Int
    var streakDays: Int
    var hearts: Int
    var maxHearts: Int

    // Skill progression
    var skillLevel: SkillLevel
    var completedModuleIDs: [UUID]

    // Meta
    var joinedAt: Date
    var lastActiveAt: Date

    init(
        id: UUID = UUID(),
        displayName: String,
        avatarURL: URL? = nil,
        xp: Int = 0,
        level: Int = 1,
        streakDays: Int = 0,
        hearts: Int = 5,
        maxHearts: Int = 5,
        skillLevel: SkillLevel = .rookie,
        completedModuleIDs: [UUID] = [],
        joinedAt: Date = .now,
        lastActiveAt: Date = .now
    ) {
        self.id = id
        self.displayName = displayName
        self.avatarURL = avatarURL
        self.xp = xp
        self.level = level
        self.streakDays = streakDays
        self.hearts = hearts
        self.maxHearts = maxHearts
        self.skillLevel = skillLevel
        self.completedModuleIDs = completedModuleIDs
        self.joinedAt = joinedAt
        self.lastActiveAt = lastActiveAt
    }
}

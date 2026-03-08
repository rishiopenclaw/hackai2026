import Foundation

struct SpeakingModule: Identifiable, Codable, Hashable {
    let id: UUID
    var title: String
    var subtitle: String
    var type: ModuleType

    // Learning path placement
    var pathIndex: Int
    var branch: Int // 0 = main trunk, +/- for side branches

    // Progression
    var status: ModuleStatus
    var requiredXP: Int
    var xpReward: Int
    var heartCost: Int

    // Difficulty
    var recommendedSkill: SkillLevel
    var estimatedDurationSeconds: Int

    // Optional unlock dependency
    var prerequisiteModuleID: UUID?

    init(
        id: UUID = UUID(),
        title: String,
        subtitle: String,
        type: ModuleType,
        pathIndex: Int,
        branch: Int = 0,
        status: ModuleStatus = .locked,
        requiredXP: Int = 0,
        xpReward: Int,
        heartCost: Int = 1,
        recommendedSkill: SkillLevel = .rookie,
        estimatedDurationSeconds: Int,
        prerequisiteModuleID: UUID? = nil
    ) {
        self.id = id
        self.title = title
        self.subtitle = subtitle
        self.type = type
        self.pathIndex = pathIndex
        self.branch = branch
        self.status = status
        self.requiredXP = requiredXP
        self.xpReward = xpReward
        self.heartCost = heartCost
        self.recommendedSkill = recommendedSkill
        self.estimatedDurationSeconds = estimatedDurationSeconds
        self.prerequisiteModuleID = prerequisiteModuleID
    }
}

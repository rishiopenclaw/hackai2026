import Foundation

struct SpeakingModule: Identifiable, Codable {
    var id: UUID = UUID()
    var title: String
    var description: String?
    var iconName: String?
    var isLocked: Bool = true
    var requiredLevel: Int = 1
    var progress: Double = 0.0 // 0.0 to 1.0
}

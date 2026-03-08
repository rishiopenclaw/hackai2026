import SwiftUI

extension Color {
    static let primaryGreen = Color(hex: "58CC02")
    static let primaryGreenShadow = Color(hex: "58A700")
    
    static let successBlue = Color(hex: "02DEE8")
    static let successBlueShadow = Color(hex: "01B4BD")
    
    static let warmOrange = Color(hex: "FF9600")
    static let deepPurple = Color(hex: "CE82FF")
    
    static let backgroundLight = Color(white: 0.96)
    static let backgroundDark = Color.black
    
    static let cardBackground = Color(UIColor.systemBackground)
    static let secondaryText = Color.gray
    
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

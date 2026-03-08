import SwiftUI

/// Centralized color palette for SpeakArena, with vibrant colors and dark‑mode variants.
extension Color {
    // Primary brand colors
    static let primaryGreen = Color(red: 0.20, green: 0.80, blue: 0.30) // #33CC4D
    static let successBlue   = Color(red: 0.25, green: 0.45, blue: 0.95) // #3F73F2
    static let warmOrange    = Color(red: 0.95, green: 0.55, blue: 0.20) // #F28C33
    static let deepPurple    = Color(red: 0.45, green: 0.30, blue: 0.85) // #734DDA
    
    // Backgrounds
    static let backgroundLight = Color(red: 0.97, green: 0.97, blue: 0.97) // #F7F7F7
    static let backgroundDark  = Color(red: 0.10, green: 0.10, blue: 0.12) // #1A1A1F
    
    // Text colors
    static let primaryTextLight = Color.black
    static let primaryTextDark  = Color.white
    
    // Adaptive colors for dark mode support
    static var adaptiveBackground: Color {
        Color(UIColor { trait in
            trait.userInterfaceStyle == .dark ? UIColor(backgroundDark) : UIColor(backgroundLight)
        })
    }
    static var adaptivePrimaryText: Color {
        Color(UIColor { trait in
            trait.userInterfaceStyle == .dark ? UIColor(primaryTextDark) : UIColor(primaryTextLight)
        })
    }
}

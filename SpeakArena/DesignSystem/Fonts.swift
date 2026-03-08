import SwiftUI

/// Font utilities for SpeakArena, using SF Pro Rounded (or Inter) with dynamic type support.
struct SpeakArenaFont {
    static func headline(size: CGFloat = 24, weight: Font.Weight = .bold) -> Font {
        Font.system(size: size, weight: weight, design: .rounded)
    }
    static func subheadline(size: CGFloat = 18, weight: Font.Weight = .semibold) -> Font {
        Font.system(size: size, weight: weight, design: .rounded)
    }
    static func body(size: CGFloat = 16, weight: Font.Weight = .regular) -> Font {
        Font.system(size: size, weight: weight, design: .rounded)
    }
    static func caption(size: CGFloat = 12, weight: Font.Weight = .regular) -> Font {
        Font.system(size: size, weight: weight, design: .rounded)
    }
}

// Example usage in a view:
// Text("Play")
//     .font(SpeakArenaFont.headline())
//     .foregroundColor(.primaryText)

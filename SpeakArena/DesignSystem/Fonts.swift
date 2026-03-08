import SwiftUI

extension Font {
    static func appFont(size: CGFloat, weight: Font.Weight = .regular) -> Font {
        // Fallback to system rounded if a custom font isn't bundled yet
        return Font.system(size: size, weight: weight, design: .rounded)
    }
}

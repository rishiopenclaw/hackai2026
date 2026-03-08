import SwiftUI

/// A button style that mimics Duolingo's chunky, rounded buttons with a subtle 3D press effect.
struct DuolingoButtonModifier: ViewModifier {
    var backgroundColor: Color = Color("PrimaryGreen")
    var foregroundColor: Color = .white
    var cornerRadius: CGFloat = 24
    var height: CGFloat = 56
    var shadowColor: Color = Color.black.opacity(0.2)
    var shadowRadius: CGFloat = 4
    var shadowYOffset: CGFloat = 2
    
    func body(content: Content) -> some View {
        content
            .font(.system(size: 20, weight: .bold, design: .rounded))
            .foregroundColor(foregroundColor)
            .frame(maxWidth: .infinity, minHeight: height)
            .background(backgroundColor)
            .cornerRadius(cornerRadius, style: .continuous)
            .shadow(color: shadowColor, radius: shadowRadius, x: 0, y: shadowYOffset)
            .scaleEffect(1.0)
            .animation(.spring(response: 0.3, dampingFraction: 0.6), value: UUID())
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .stroke(Color.black.opacity(0.1), lineWidth: 1)
            )
            .onTapGesture {
                // Haptic feedback on tap
                let generator = UIImpactFeedbackGenerator(style: .medium)
                generator.impactOccurred()
            }
    }
}

extension View {
    /// Convenience modifier to apply the Duolingo button style.
    func duolingoButton(background: Color = Color("PrimaryGreen"), foreground: Color = .white) -> some View {
        self.modifier(DuolingoButtonModifier(backgroundColor: background, foregroundColor: foreground))
    }
}

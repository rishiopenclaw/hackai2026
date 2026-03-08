import SwiftUI

struct DuolingoButtonModifier: ViewModifier {
    var backgroundColor: Color = .primaryGreen
    var shadowColor: Color = .primaryGreenShadow
    
    func body(content: Content) -> some View {
        content
            .font(Font.appFont(size: 20, weight: .bold))
            .foregroundColor(.white)
            .padding(.vertical, 16)
            .padding(.horizontal, 24)
            .background(
                ZStack {
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .fill(shadowColor)
                        .offset(y: 4)
                    
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .fill(backgroundColor)
                }
            )
            .buttonStyle(DuolingoButtonStyle())
    }
}

struct DuolingoButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .offset(y: configuration.isPressed ? 4 : 0)
            .animation(.spring(response: 0.3, dampingFraction: 0.5), value: configuration.isPressed)
    }
}

extension View {
    func duolingoButtonStyle(bg: Color = .primaryGreen, shadow: Color = .primaryGreenShadow) -> some View {
        self.modifier(DuolingoButtonModifier(backgroundColor: bg, shadowColor: shadow))
    }
}

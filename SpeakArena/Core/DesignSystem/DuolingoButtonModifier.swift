import SwiftUI

struct DuolingoButtonModifier: ButtonStyle {
    var fill: Color = .arenaGreen
    var base: Color = .arenaGreenDark

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.arenaBody)
            .foregroundStyle(.white)
            .padding(.vertical, 16)
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .fill(base)
            )
            .overlay(alignment: .top) {
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .fill(fill)
                    .offset(y: configuration.isPressed ? 4 : 0)
            }
            .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
            .animation(.spring(response: 0.2, dampingFraction: 0.75), value: configuration.isPressed)
    }
}

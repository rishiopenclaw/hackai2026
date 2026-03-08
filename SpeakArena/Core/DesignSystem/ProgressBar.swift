import SwiftUI

struct ProgressBar: View {
    let progress: Double
    var fill: Color = .arenaGreen

    var body: some View {
        GeometryReader { proxy in
            ZStack(alignment: .leading) {
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .fill(Color.black.opacity(0.08))
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .fill(fill)
                    .frame(width: proxy.size.width * max(0, min(progress, 1)))
                    .animation(.spring(response: 0.4, dampingFraction: 0.8), value: progress)
            }
        }
        .frame(height: 14)
    }
}

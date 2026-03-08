import SwiftUI

struct ProgressBar: View {
    var progress: Double
    var color: Color = .primaryGreen

    var body: some View {
        GeometryReader { geometry in
            ZStack(alignment: .leading) {
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .frame(width: geometry.size.width, height: 16)
                    .foregroundColor(Color(UIColor.systemGray5))

                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .frame(width: max(0, min(geometry.size.width * CGFloat(progress), geometry.size.width)), height: 16)
                    .foregroundColor(color)
                    .animation(.spring(), value: progress)
            }
        }
        .frame(height: 16)
    }
}

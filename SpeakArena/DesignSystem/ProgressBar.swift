import SwiftUI

/// A customizable progress bar with a gradient fill and spring animation.
struct ProgressBar: View {
    var progress: Double // 0.0 to 1.0
    var height: CGFloat = 12
    var cornerRadius: CGFloat = 6
    var gradient: Gradient = Gradient(colors: [Color("PrimaryGreen"), Color("SuccessBlue")])
    var backgroundColor: Color = Color.gray.opacity(0.2)
    
    @State private var animatedProgress: Double = 0.0
    
    var body: some View {
        GeometryReader { geometry in
            ZStack(alignment: .leading) {
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .fill(backgroundColor)
                    .frame(height: height)
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .fill(LinearGradient(gradient: gradient, startPoint: .leading, endPoint: .trailing))
                    .frame(width: geometry.size.width * CGFloat(animatedProgress), height: height)
                    .animation(.spring(response: 0.4, dampingFraction: 0.6), value: animatedProgress)
            }
        }
        .frame(height: height)
        .onAppear {
            animatedProgress = progress
        }
        .onChange(of: progress) { newValue in
            animatedProgress = newValue
        }
    }
}

// Preview for quick visual check
struct ProgressBar_Previews: PreviewProvider {
    static var previews: some View {
        VStack(spacing: 20) {
            ProgressBar(progress: 0.25)
            ProgressBar(progress: 0.5)
            ProgressBar(progress: 0.75)
            ProgressBar(progress: 1.0)
        }
        .padding()
        .previewLayout(.sizeThatFits)
    }
}

import SwiftUI

struct HomeView: View {
    @StateObject private var viewModel = HomeViewModel()
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 40) {
                    ForEach(viewModel.modules) { module in
                        ModuleNodeView(module: module)
                    }
                }
                .padding(.vertical, 40)
            }
            .background(Color.backgroundLight.ignoresSafeArea())
            .navigationTitle("Learning Path")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    HStack {
                        Image(systemName: "flame.fill")
                            .foregroundColor(.warmOrange)
                        Text("\(viewModel.streak)")
                            .font(Font.appFont(size: 16, weight: .bold))
                            .foregroundColor(.warmOrange)
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    HStack {
                        Image(systemName: "heart.fill")
                            .foregroundColor(.red)
                        Text("\(viewModel.hearts)")
                            .font(Font.appFont(size: 16, weight: .bold))
                            .foregroundColor(.red)
                    }
                }
            }
        }
    }
}

struct ModuleNodeView: View {
    var module: SpeakingModule
    
    var body: some View {
        NavigationLink(destination: Text("Lesson: \(module.title)")) {
            VStack {
                ZStack {
                    Circle()
                        .fill(module.isLocked ? Color.gray.opacity(0.3) : Color.primaryGreen)
                        .frame(width: 80, height: 80)
                        .shadow(color: module.isLocked ? .clear : Color.primaryGreenShadow, radius: 0, x: 0, y: 6)
                    
                    if module.isLocked {
                        Image(systemName: "lock.fill")
                            .font(.system(size: 30))
                            .foregroundColor(.gray)
                    } else {
                        Image(systemName: module.iconName)
                            .font(.system(size: 30))
                            .foregroundColor(.white)
                    }
                }
                
                Text(module.title)
                    .font(Font.appFont(size: 18, weight: .bold))
                    .foregroundColor(.primary)
                
                if !module.isLocked {
                    ProgressBar(progress: module.progress, color: .warmOrange)
                        .frame(width: 100)
                }
            }
        }
        .disabled(module.isLocked)
    }
}

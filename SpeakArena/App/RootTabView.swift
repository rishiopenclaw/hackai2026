import SwiftUI

struct RootTabView: View {
    var body: some View {
        TabView {
            HomePathView(viewModel: HomePathViewModel())
                .tabItem {
                    Label("Path", systemImage: "point.3.filled.connected.trianglepath.dotted")
                }

            P2PDebateView(viewModel: P2PDebateViewModel())
                .tabItem {
                    Label("Arena", systemImage: "person.2.fill")
                }

            DrillsView()
                .tabItem {
                    Label("Drills", systemImage: "waveform")
                }

            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person.crop.circle")
                }
        }
        .tint(.arenaGreen)
    }
}

import SwiftUI

private enum TopMode: String, CaseIterable {
    case practice = "Practice"
    case club = "Club"
}

private struct PracticePath: Identifiable {
    let id: String
    let title: String
    let focus: String
    let nodes: [PathNode]
}

private struct PathNode: Identifiable {
    let id: String
    let title: String
    let subtitle: String
}

private struct ClubRoom: Identifiable {
    let id: String
    let name: String
    let host: String
    let players: Int
    let maxPlayers: Int
    let mode: String
    let code: String
}

struct HomePathView: View {
    @EnvironmentObject private var appState: AppState
    @StateObject var viewModel: HomePathViewModel

    @State private var topMode: TopMode = .practice
    @State private var selectedPathID: String = "everyday"
    @State private var completedNodeIDs: Set<String> = ["everyday-1"]
    @State private var joinCode: String = ""
    @State private var rooms: [ClubRoom] = [
        .init(id: "room-1", name: "Weekend Fluency", host: "Ava", players: 3, maxPlayers: 6, mode: "Quick Match", code: "FLUX"),
        .init(id: "room-2", name: "Pitch Night", host: "Kai", players: 4, maxPlayers: 6, mode: "Pitch Battle", code: "PITCH")
    ]

    private let practicePaths: [PracticePath] = [
        .init(
            id: "everyday",
            title: "Everyday",
            focus: "Casual conversations + confidence",
            nodes: [
                .init(id: "everyday-1", title: "Quick Replies", subtitle: "Respond clearly in 5-10 seconds"),
                .init(id: "everyday-2", title: "Small Talk Builder", subtitle: "Build natural conversation flow"),
                .init(id: "everyday-3", title: "Follow-up Chain", subtitle: "Ask strong follow-up questions")
            ]
        ),
        .init(
            id: "clarify",
            title: "Clarify",
            focus: "Question quality + active listening",
            nodes: [
                .init(id: "clarify-1", title: "Ask Better Questions", subtitle: "Ask direct, useful prompts"),
                .init(id: "clarify-2", title: "Intent Decoder", subtitle: "Clarify what people actually mean"),
                .init(id: "clarify-3", title: "Interview Mode", subtitle: "Lead structured Q&A rounds")
            ]
        ),
        .init(
            id: "persuade",
            title: "Persuade",
            focus: "Structure + convincing delivery",
            nodes: [
                .init(id: "persuade-1", title: "30-sec Pitch", subtitle: "Deliver concise, high-impact pitch"),
                .init(id: "persuade-2", title: "Objection Handling", subtitle: "Handle pushback under pressure"),
                .init(id: "persuade-3", title: "Story to Point", subtitle: "Turn stories into strong arguments")
            ]
        )
    ]

    private var selectedPath: PracticePath {
        practicePaths.first(where: { $0.id == selectedPathID }) ?? practicePaths[0]
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    topSwitcher
                    topBar

                    if topMode == .practice {
                        practiceContent
                    } else {
                        clubContent
                    }
                }
                .padding()
            }
            .background(Color.arenaBG.ignoresSafeArea())
            .navigationTitle(topMode.rawValue)
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    private var topSwitcher: some View {
        HStack(spacing: 6) {
            ForEach(TopMode.allCases, id: \.self) { mode in
                Button {
                    topMode = mode
                } label: {
                    Text(mode.rawValue)
                        .font(.arenaBody.weight(.semibold))
                        .foregroundStyle(topMode == mode ? .white : .arenaTextSecondary)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                        .background(topMode == mode ? Color.arenaPurple : .clear)
                        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                }
                .buttonStyle(.plain)
            }
        }
        .padding(4)
        .background(.white.opacity(0.75), in: RoundedRectangle(cornerRadius: 14, style: .continuous))
    }

    private var topBar: some View {
        HStack(spacing: 14) {
            Label("\(appState.user.hearts)", systemImage: "heart.fill")
                .font(.arenaBody)
                .foregroundStyle(.red)
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(.white, in: Capsule())

            Label("\(appState.user.streakDays)", systemImage: "flame.fill")
                .font(.arenaBody)
                .foregroundStyle(.arenaOrange)
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(.white, in: Capsule())

            Spacer()
            MascotBubbleView()
        }
    }

    private var practiceContent: some View {
        VStack(spacing: 14) {
            xpCard

            pathSelector

            VStack(alignment: .leading, spacing: 8) {
                Text(selectedPath.title)
                    .font(.arenaHeading)
                    .foregroundStyle(.arenaTextPrimary)
                Text(selectedPath.focus)
                    .font(.arenaCaption)
                    .foregroundStyle(.arenaTextSecondary)
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            VStack(spacing: 10) {
                ForEach(Array(selectedPath.nodes.enumerated()), id: \.element.id) { index, node in
                    let unlocked = index == 0 || completedNodeIDs.contains(selectedPath.nodes[index - 1].id)
                    let completed = completedNodeIDs.contains(node.id)

                    Button {
                        if unlocked { completedNodeIDs.insert(node.id) }
                    } label: {
                        HStack(spacing: 10) {
                            Image(systemName: completed ? "checkmark.circle.fill" : (unlocked ? "play.circle.fill" : "lock.fill"))
                                .font(.system(size: 20, weight: .semibold))
                                .foregroundStyle(completed ? Color.arenaGreen : (unlocked ? Color.arenaPurple : .gray))

                            VStack(alignment: .leading, spacing: 2) {
                                Text(node.title)
                                    .font(.arenaBody.weight(.semibold))
                                    .foregroundStyle(unlocked ? .arenaTextPrimary : .arenaTextSecondary)
                                Text(completed ? "Completed" : (unlocked ? "Tap to play" : "Complete previous node"))
                                    .font(.caption)
                                    .foregroundStyle(.arenaTextSecondary)
                            }

                            Spacer()
                        }
                        .padding(12)
                        .background(.white, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
                        .overlay(
                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                .stroke(Color.black.opacity(0.06), lineWidth: 1)
                        )
                    }
                    .buttonStyle(.plain)
                    .disabled(!unlocked)
                }
            }
        }
    }

    private var pathSelector: some View {
        HStack(spacing: 8) {
            ForEach(practicePaths) { path in
                Button {
                    selectedPathID = path.id
                } label: {
                    Text(path.title)
                        .font(.arenaCaption.weight(.semibold))
                        .foregroundStyle(selectedPathID == path.id ? .arenaPurple : .arenaTextSecondary)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 8)
                        .background(selectedPathID == path.id ? Color.arenaPurple.opacity(0.15) : .white)
                        .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                }
                .buttonStyle(.plain)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private var clubContent: some View {
        VStack(spacing: 12) {
            HStack(spacing: 10) {
                Button {
                    createRoom()
                } label: {
                    Label("Create Room", systemImage: "plus.circle.fill")
                        .font(.arenaBody.weight(.semibold))
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(Color.arenaPurple)
                        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                }
                .buttonStyle(.plain)

                Button {
                    quickMatch()
                } label: {
                    Label("Quick Match", systemImage: "person.3.fill")
                        .font(.arenaBody.weight(.semibold))
                        .foregroundStyle(.arenaPurple)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(Color.arenaPurple.opacity(0.16))
                        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                }
                .buttonStyle(.plain)
            }

            HStack(spacing: 8) {
                TextField("Enter room code", text: $joinCode)
                    .textInputAutocapitalization(.characters)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 10)
                    .background(.white, in: RoundedRectangle(cornerRadius: 12, style: .continuous))

                Button("Join") {
                    joinByCode()
                }
                .font(.arenaBody.weight(.semibold))
                .foregroundStyle(.white)
                .padding(.horizontal, 18)
                .padding(.vertical, 10)
                .background(Color.arenaGreen, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            }

            VStack(spacing: 8) {
                ForEach(rooms) { room in
                    HStack {
                        VStack(alignment: .leading, spacing: 3) {
                            Text(room.name)
                                .font(.arenaBody.weight(.semibold))
                                .foregroundStyle(.arenaTextPrimary)
                            Text("\(room.mode) · Host \(room.host) · Code \(room.code)")
                                .font(.caption)
                                .foregroundStyle(.arenaTextSecondary)
                        }
                        Spacer()
                        Label("\(room.players)/\(room.maxPlayers)", systemImage: "person.2.fill")
                            .font(.caption)
                            .foregroundStyle(.arenaTextSecondary)
                    }
                    .padding(12)
                    .background(.white, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                    .overlay(
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .stroke(Color.black.opacity(0.05), lineWidth: 1)
                    )
                }
            }
        }
    }

    private var xpCard: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Level \(appState.user.level) • \(appState.user.xp) XP")
                .font(.arenaHeading)
                .foregroundStyle(.arenaTextPrimary)
            ProgressBar(progress: 0.68, fill: .arenaPurple)
        }
        .padding(16)
        .background(.white, in: RoundedRectangle(cornerRadius: 24, style: .continuous))
    }

    private func createRoom() {
        let code = String(UUID().uuidString.prefix(4)).uppercased()
        let room = ClubRoom(id: UUID().uuidString, name: "Room \(code)", host: "You", players: 1, maxPlayers: 6, mode: "Quick Match", code: code)
        rooms.insert(room, at: 0)
    }

    private func quickMatch() {
        if rooms.first(where: { $0.players < $0.maxPlayers }) == nil {
            createRoom()
        }
    }

    private func joinByCode() {
        guard !joinCode.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
        _ = rooms.first(where: { $0.code.lowercased() == joinCode.trimmingCharacters(in: .whitespacesAndNewlines).lowercased() })
    }
}

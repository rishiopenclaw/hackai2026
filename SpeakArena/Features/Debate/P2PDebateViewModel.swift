import Foundation

@MainActor
final class P2PDebateViewModel: ObservableObject {
    @Published var session: DebateSession
    @Published var secondsLeft: Int = 60
    @Published var isUserSpeaking = true
    @Published var transcript: String = "I believe remote work boosts focus and reduces context switching..."

    private var timer: Timer?

    init() {
        let user = MockData.user
        self.session = DebateSession(mode: .p2p, topicPrompt: "Is remote work better than office work?", speakerAUserID: user.id, speakerBUserID: UUID(), currentPhase: .openingA)
    }

    func startTimer() {
        timer?.invalidate()
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
            guard let self else { return }
            if self.secondsLeft > 0 {
                self.secondsLeft -= 1
            } else {
                self.advanceTurn()
            }
        }
    }

    func advanceTurn() {
        Haptics.medium()
        secondsLeft = isUserSpeaking ? 60 : 30
        isUserSpeaking.toggle()
        session.currentPhase = isUserSpeaking ? .openingA : .openingB
    }

    deinit { timer?.invalidate() }
}

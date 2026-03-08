import React, { useMemo, useCallback } from 'react';
import { Animated, StyleSheet, Text, View, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useConversation } from '@elevenlabs/react-native';
import Bouncy3DButton from '../../components/Bouncy3DButton';
import { apiJson } from '../../lib/api';
import { startRecording, stopRecording, cancelRecording, requestMicPermission } from '../../lib/voice';
import { getCoachSessionConfig, getModeratorSessionConfig } from '../../lib/voice/elevenlabs';

export default function SessionLiveScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
  const mode = route.params?.mode || 'practice';
  const topic = route.params?.topic;
  const roomTitle = route.params?.roomTitle;
  const localFriend = route.params?.localFriend;
  const debateId = route.params?.debateId;
  const prompt = route.params?.prompt;
  const instructions = route.params?.instructions;
  const exerciseType = route.params?.exerciseType || 'general';
  const coachProfile = route.params?.coachProfile || null;

  const isDebateMode = mode === 'club-debate';
  const isCoachMode = mode === 'coach-practice';

  const pulse = useMemo(() => new Animated.Value(1), []);
  const [debateStarted, setDebateStarted] = React.useState(false);
  const [debateComplete, setDebateComplete] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(isDebateMode ? 15 : (route.params?.durationSeconds || 20));
  const [turnIndex, setTurnIndex] = React.useState(0);
  const [pendingJudgeCount, setPendingJudgeCount] = React.useState(0);
  const [finishing, setFinishing] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [micActive, setMicActive] = React.useState(false);
  const [micError, setMicError] = React.useState('');
  const [transcriptInput, setTranscriptInput] = React.useState('');
  const [coachStatus, setCoachStatus] = React.useState('idle');
  const [coachSpeaking, setCoachSpeaking] = React.useState(false);
  const [moderatorPhase, setModeratorPhase] = React.useState('idle');
  const [turnTransition, setTurnTransition] = React.useState(false);

  const pendingSubmissionsRef = React.useRef([]);
  const actionLockRef = React.useRef(false);
  const recordingStartedRef = React.useRef(false);
  const turnIndexRef = React.useRef(0);
  const recordingLockRef = React.useRef(false);
  const activeAgentRef = React.useRef(null); // 'coach' | 'moderator'

  const conversation = useConversation({
    onConnect: ({ conversationId }) => {
      console.info('[11labs] onConnect', { agent: activeAgentRef.current, conversationId });
      if (activeAgentRef.current === 'coach') setCoachStatus('connected');
      else if (activeAgentRef.current === 'moderator') setModeratorPhase('connected');
    },
    onDisconnect: (details) => {
      console.info('[11labs] onDisconnect', { agent: activeAgentRef.current, details });
      if (activeAgentRef.current === 'coach') setCoachStatus('disconnected');
      else if (activeAgentRef.current === 'moderator') setModeratorPhase('disconnected');
    },
    onError: (message, context) => {
      console.error('[11labs] onError', { agent: activeAgentRef.current, message, context });
      if (activeAgentRef.current === 'coach') setCoachStatus('error');
      else if (activeAgentRef.current === 'moderator') setModeratorPhase('error');
    },
    onModeChange: ({ mode: m }) => {
      console.info('[11labs] onModeChange', { agent: activeAgentRef.current, mode: m });
      if (activeAgentRef.current === 'coach') {
        const isSpeaking = m === 'speaking';
        setCoachSpeaking(isSpeaking);
      } else if (activeAgentRef.current === 'moderator') {
        if (m === 'speaking') {
          setModeratorPhase('speaking');
        } else if (m === 'listening') {
          setModeratorPhase((prev) => (prev === 'speaking' ? 'done_speaking' : prev));
        }
      }
    },
    onStatusChange: ({ status }) => {
      console.info('[11labs] onStatusChange', { agent: activeAgentRef.current, status });
      if (activeAgentRef.current === 'coach') setCoachStatus(status);
      else if (activeAgentRef.current === 'moderator' && status === 'connected') setModeratorPhase('connected');
    },
    onMessage: ({ message, source }) => {
      console.info('[11labs] onMessage', { agent: activeAgentRef.current, source, message });
    },
  });

  // When moderator finishes speaking, end its session and start the turn
  React.useEffect(() => {
    if (moderatorPhase !== 'done_speaking') return;
    if (activeAgentRef.current !== 'moderator') return;
    let active = true;
    (async () => {
      try {
        activeAgentRef.current = null;
        await conversation.endSession();
      } catch {}
      if (!active) return;
      setModeratorPhase('idle');
      setTurnTransition(false);
      await safeStartRecording();
    })();
    return () => { active = false; };
  }, [moderatorPhase]);

  // Pulse animation
  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 500, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const safeStartRecording = useCallback(async () => {
    if (recordingLockRef.current) return;
    recordingLockRef.current = true;
    try {
      await cancelRecording().catch(() => {});
      await startRecording();
      setMicActive(true);
      recordingStartedRef.current = true;
    } catch (err) {
      console.error('Failed to start recording:', err);
      setMicError('Could not start microphone. Use text input as fallback.');
    } finally {
      recordingLockRef.current = false;
    }
  }, []);

  const launchModerator = useCallback(async () => {
    try {
      activeAgentRef.current = 'moderator';
      setModeratorPhase('connecting');
      const modConfig = getModeratorSessionConfig({
        topic,
        playerAName: 'Player A',
        playerBName: localFriend ? 'Player B (Friend)' : 'Player B',
      });
      await conversation.startSession(modConfig);
    } catch (err) {
      console.error('Moderator launch failed:', err);
      setModeratorPhase('error');
    }
  }, [topic, localFriend, conversation]);

  const startDebateSession = useCallback(async () => {
    const granted = await requestMicPermission();
    if (!granted) {
      setMicError('Microphone permission denied. Please enable it in Settings.');
      return;
    }

    setDebateStarted(true);
    setTurnTransition(true);

    await launchModerator();

    // Fallback: if the moderator doesn't speak within 8s, start the turn anyway
    setTimeout(() => {
      setModeratorPhase((current) => {
        if (current !== 'idle' && current !== 'error' && current !== 'disconnected') {
          activeAgentRef.current = null;
          conversation.endSession().catch(() => {});
          setTurnTransition(false);
          safeStartRecording();
          return 'idle';
        }
        return current;
      });
    }, 8000);
  }, [launchModerator, conversation, safeStartRecording]);

  // Auto-start mic for non-coach, non-debate practice on mount
  React.useEffect(() => {
    if (isCoachMode || isDebateMode) return;
    let cancelled = false;
    (async () => {
      const granted = await requestMicPermission();
      if (cancelled) return;
      if (!granted) {
        setMicError('Microphone permission denied. Please enable it in Settings.');
        return;
      }
      try {
        await startRecording();
        if (!cancelled) {
          setMicActive(true);
          recordingStartedRef.current = true;
        }
      } catch (err) {
        console.error('Failed to start recording:', err);
        if (!cancelled) setMicError('Could not start microphone. Use text input as fallback.');
      }
    })();
    return () => {
      cancelled = true;
      cancelRecording().catch(() => {});
    };
  }, [isCoachMode, isDebateMode]);

  // Auto-start coach session on mount
  React.useEffect(() => {
    if (!isCoachMode) return;
    let cancelled = false;
    console.info('[11labs] coach effect MOUNT, starting session');
    (async () => {
      try {
        activeAgentRef.current = 'coach';
        setCoachStatus('connecting');
        const config = getCoachSessionConfig({
          exerciseType,
          prompt: prompt || topic,
          profile: coachProfile,
        });
        console.info('[11labs] coach startSession config:', JSON.stringify(config));
        await conversation.startSession(config);
        console.info('[11labs] coach startSession resolved OK');
      } catch (err) {
        console.error('[11labs] coach startSession FAILED:', err);
        if (!cancelled) setCoachStatus('error');
      }
    })();
    return () => {
      console.info('[11labs] coach effect CLEANUP, cancelled=', cancelled);
      cancelled = true;
      activeAgentRef.current = null;
      conversation.endSession().catch(() => {});
    };
  }, [isCoachMode]);

  // Timer: paused during moderator speech, transitions, and after debate ends
  React.useEffect(() => {
    if (isCoachMode) return;
    if (isDebateMode && (!debateStarted || turnTransition || debateComplete)) return;
    if (finishing) return;
    if (secondsLeft <= 0) {
      if (isDebateMode) {
        handleDebateTurnSubmit();
      } else {
        handlePracticeStop();
      }
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, finishing, isCoachMode, isDebateMode, debateStarted, turnTransition, debateComplete]);

  const currentSpeaker = turnIndex % 2 === 0 ? 'A' : 'B';

  const handleDebateTurnSubmit = useCallback(async () => {
    if (actionLockRef.current || finishing || debateComplete) return;
    actionLockRef.current = true;

    const currentTurn = turnIndexRef.current;
    const speaker = currentTurn % 2 === 0 ? 'A' : 'B';

    let audioPayload = null;
    if (recordingStartedRef.current) {
      try {
        audioPayload = await stopRecording();
        setMicActive(false);
        recordingStartedRef.current = false;
      } catch (err) {
        console.error('Stop recording failed:', err);
      }
    }

    const fallbackText = transcriptInput.trim();
    setTranscriptInput('');

    const body = {
      debateId,
      speaker,
      turnIndex: currentTurn,
    };
    if (audioPayload?.audioBase64) {
      body.audioBase64 = audioPayload.audioBase64;
      body.mimeType = audioPayload.mimeType;
    } else {
      body.transcriptText = fallbackText || '(no audio captured)';
    }

    const submitPromise = apiJson('/api/debates/turn', {
      method: 'POST',
      body: JSON.stringify(body),
    }).catch((error) => {
      console.error('Turn submit failed', error);
    });

    setPendingJudgeCount((prev) => prev + 1);
    const trackedPromise = submitPromise.finally(() => setPendingJudgeCount((prev) => Math.max(0, prev - 1)));
    pendingSubmissionsRef.current.push(trackedPromise);

    if (currentTurn < 3) {
      const nextTurn = currentTurn + 1;
      turnIndexRef.current = nextTurn;
      setTurnIndex(nextTurn);
      setSecondsLeft(15);
      actionLockRef.current = false;

      // Transition: show "Switching to Player X" for 3s then start recording
      setTurnTransition(true);
      setTimeout(async () => {
        setTurnTransition(false);
        await safeStartRecording();
      }, 3000);
      return;
    }

    // Final turn — finish the debate
    setDebateComplete(true);
    setFinishing(true);
    try {
      await Promise.allSettled(pendingSubmissionsRef.current);
      const finishResponse = await apiJson('/api/debates/finish', {
        method: 'POST',
        body: JSON.stringify({ debateId }),
      });
      setResult(finishResponse?.result || null);
    } catch (error) {
      console.error('Failed to finish debate', error);
    } finally {
      actionLockRef.current = false;
      setFinishing(false);
    }
  }, [finishing, debateComplete, debateId, transcriptInput, safeStartRecording]);

  const handlePracticeStop = useCallback(async () => {
    if (actionLockRef.current || finishing) return;
    actionLockRef.current = true;
    setFinishing(true);

    let audioPayload = null;
    if (recordingStartedRef.current) {
      try {
        audioPayload = await stopRecording();
        setMicActive(false);
        recordingStartedRef.current = false;
      } catch (err) {
        console.error('Stop recording failed:', err);
      }
    }

    const fallbackText = transcriptInput.trim();

    try {
      const reqBody = { exerciseType, topic: prompt || topic };
      if (audioPayload?.audioBase64) {
        reqBody.audioBase64 = audioPayload.audioBase64;
        reqBody.mimeType = audioPayload.mimeType;
      } else {
        reqBody.transcriptText = fallbackText || '(no audio captured)';
      }

      const feedbackResponse = await apiJson('/api/gemini/speech', {
        method: 'POST',
        body: JSON.stringify(reqBody),
      });
      navigation.replace('SessionReflect', {
        trackId,
        feedback: feedbackResponse?.metrics || null,
        prompt: prompt || topic || '',
      });
    } catch (error) {
      console.error('Practice evaluation failed', error);
      navigation.replace('SessionReflect', {
        trackId,
        prompt: prompt || topic || '',
      });
    } finally {
      actionLockRef.current = false;
      setFinishing(false);
    }
  }, [finishing, transcriptInput, exerciseType, prompt, topic, trackId, navigation]);

  const handleCoachEnd = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch {}
    navigation.replace('SessionReflect', {
      trackId,
      prompt: prompt || topic || '',
    });
  }, [conversation, trackId, prompt, topic, navigation]);

  const renderDebateResult = () => (
    <View style={styles.resultWrap}>
      <Text style={styles.resultHeading}>Debate complete</Text>
      <Text style={styles.resultLine}>Winner: {result?.winner || 'Pending'}</Text>
      <Text style={styles.resultLine}>Player A: {result?.score_a ?? '-'}</Text>
      <Text style={styles.resultLine}>Player B: {result?.score_b ?? '-'}</Text>
      <Text style={styles.resultBody}>{result?.reasoning || 'Reasoning is loading.'}</Text>
      <Text style={styles.resultBody}>A feedback: {result?.feedback_a || 'Loading feedback...'}</Text>
      <Text style={styles.resultBody}>B feedback: {result?.feedback_b || 'Loading feedback...'}</Text>
      <Bouncy3DButton
        title="Go to reflection"
        variant="green"
        onPress={() => navigation.replace('SessionReflect', { trackId, debateResult: result, topic })}
        style={{ marginTop: 12 }}
      />
    </View>
  );

  const renderCoachUI = () => (
    <View style={styles.topicWrap}>
      <Text style={styles.roomName}>Voice Coach</Text>
      <Text style={styles.topicText}>{prompt || topic || 'Your coach is ready.'}</Text>
      {!!instructions && <Text style={styles.topicLabel}>{instructions}</Text>}
      <View style={styles.coachStatusRow}>
        <View style={[styles.statusDot, {
          backgroundColor: coachStatus === 'connected' ? '#10B981'
            : coachStatus === 'connecting' ? '#F59E0B'
            : coachStatus === 'error' ? '#EF4444' : '#9CA3AF',
        }]} />
        <Text style={styles.topicLabel}>
          {coachStatus === 'connected'
            ? (coachSpeaking
              ? 'Coach is speaking — listen...'
              : 'Coach is listening...')
            : coachStatus === 'connecting' ? 'Connecting to coach...'
            : coachStatus === 'error' ? 'Connection error'
            : 'Disconnected'}
        </Text>
      </View>
    </View>
  );

  // Pre-debate start screen
  if (isDebateMode && !debateStarted) {
    return (
      <ScrollView contentContainerStyle={styles.root}>
        <View style={styles.card}>
          <Text style={styles.title}>DEBATE READY</Text>
          <View style={styles.topicWrap}>
            <Text style={styles.roomName}>{roomTitle || 'Debate Room'}</Text>
            <Text style={styles.topicLabel}>{localFriend ? 'Mode: Friend Nearby' : 'Mode: Online Lobby'}</Text>
            <Text style={styles.topicText}>{topic}</Text>
            <Text style={styles.topicLabel}>4 turns • 15 seconds each • alternating speakers</Text>
          </View>

          <View style={styles.preDebateInfo}>
            <Text style={styles.preDebateStep}>1. Player A speaks for 15s</Text>
            <Text style={styles.preDebateStep}>2. Player B speaks for 15s</Text>
            <Text style={styles.preDebateStep}>3. Player A rebuts for 15s</Text>
            <Text style={styles.preDebateStep}>4. Player B rebuts for 15s</Text>
            <Text style={styles.preDebateNote}>Pass the phone between speakers after each turn.</Text>
          </View>

          {!!micError && <Text style={styles.errorText}>{micError}</Text>}

          <Bouncy3DButton
            title="Start Debate"
            variant="green"
            onPress={startDebateSession}
            style={{ marginTop: 20 }}
          />
          <Bouncy3DButton
            title="Back"
            variant="white"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 10 }}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {isDebateMode ? 'DEBATE LIVE' : isCoachMode ? 'COACH LIVE' : 'SPEAK NOW'}
        </Text>

        {isDebateMode && (
          <View style={styles.topicWrap}>
            <Text style={styles.roomName}>{roomTitle || 'Debate Room'}</Text>
            <Text style={styles.topicLabel}>{localFriend ? 'Mode: Friend Nearby' : 'Mode: Online Lobby'}</Text>
            <Text style={styles.topicText}>{topic}</Text>
            {turnTransition ? (
              <View style={styles.moderatorBanner}>
                <Text style={styles.moderatorBannerText}>
                  {moderatorPhase === 'speaking' || moderatorPhase === 'connecting' || moderatorPhase === 'connected'
                    ? 'Moderator is speaking — listen...'
                    : `Switching to Player ${turnIndex % 2 === 0 ? 'A' : 'B'}...`}
                </Text>
                <ActivityIndicator size="small" color="#8C6BFF" style={{ marginTop: 6 }} />
              </View>
            ) : (
              !debateComplete && (
                <Text style={styles.topicLabel}>Turn {turnIndex + 1}/4 • Speaker {currentSpeaker} • {secondsLeft}s left</Text>
              )
            )}
            {!!pendingJudgeCount && <Text style={styles.topicLabel}>Judging previous turn(s): {pendingJudgeCount}</Text>}
          </View>
        )}

        {isCoachMode && renderCoachUI()}

        {!isDebateMode && !isCoachMode && (
          <View style={styles.topicWrap}>
            <Text style={styles.roomName}>Practice Session</Text>
            <Text style={styles.topicText}>{prompt || topic || 'Speak clearly and with structure.'}</Text>
            {!!instructions && <Text style={styles.topicLabel}>{instructions}</Text>}
            <Text style={styles.topicLabel}>{secondsLeft}s left</Text>
          </View>
        )}

        <Animated.View style={[
          styles.micWrap,
          { transform: [{ scale: pulse }] },
          micActive && styles.micWrapActive,
          isCoachMode && coachStatus === 'connected' && !coachSpeaking && styles.micWrapActive,
        ]}>
          <Text style={styles.mic}>
            {micActive || (isCoachMode && coachStatus === 'connected' && !coachSpeaking) ? '🎙️' : '🔇'}
          </Text>
        </Animated.View>

        {isCoachMode && coachSpeaking && (
          <Text style={styles.listeningLabel}>Agent speaking — please listen</Text>
        )}

        {!!micError && <Text style={styles.errorText}>{micError}</Text>}

        {!isCoachMode && !!micError && (
          <TextInput
            value={transcriptInput}
            onChangeText={setTranscriptInput}
            placeholder="Mic unavailable — type your response..."
            multiline
            style={styles.input}
          />
        )}

        {micActive && !isCoachMode && (
          <Text style={styles.recordingLabel}>Recording...</Text>
        )}

        {finishing && <ActivityIndicator size="small" color="#58CC02" style={{ marginTop: 12 }} />}

        {!!result && renderDebateResult()}

        {!result && !isCoachMode && !debateComplete && (
          <Bouncy3DButton
            title={isDebateMode ? (turnIndex < 3 ? 'Submit turn and switch speaker' : 'Submit final turn') : 'Stop and reflect'}
            variant="green"
            onPress={isDebateMode ? handleDebateTurnSubmit : handlePracticeStop}
            style={{ marginTop: 16 }}
          />
        )}

        {isCoachMode && coachStatus === 'connected' && (
          <Bouncy3DButton
            title="End session & reflect"
            variant="white"
            onPress={handleCoachEnd}
            style={{ marginTop: 16 }}
          />
        )}

        {isCoachMode && coachStatus === 'error' && (
          <Bouncy3DButton
            title="Go to reflection"
            variant="green"
            onPress={() => navigation.replace('SessionReflect', { trackId, prompt: prompt || topic || '' })}
            style={{ marginTop: 16 }}
          />
        )}

        <Bouncy3DButton title="Settings" variant="white" onPress={() => navigation.navigate('SessionSettings')} style={{ marginTop: 10 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flexGrow: 1, backgroundColor: '#F4F9F6', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(0,0,0,0.07)' },
  title: { color: '#4B4B4B', fontSize: 22, fontWeight: '900', textAlign: 'center' },
  topicWrap: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#F7F9FF',
    padding: 12,
  },
  roomName: { color: '#2A3150', fontSize: 12, fontWeight: '800' },
  topicLabel: { color: '#7A84A3', fontSize: 11, fontWeight: '700', marginTop: 4 },
  topicText: { color: '#1E2440', fontSize: 14, fontWeight: '800', marginTop: 2, lineHeight: 20 },
  micWrap: {
    width: 84, height: 84, borderRadius: 42, alignSelf: 'center', marginTop: 16,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#E9FAD9', borderWidth: 2, borderColor: '#CCC',
  },
  micWrapActive: {
    borderColor: '#58CC02',
    backgroundColor: '#E9FAD9',
  },
  mic: { fontSize: 32 },
  recordingLabel: {
    textAlign: 'center', color: '#EF4444', fontWeight: '800', fontSize: 12, marginTop: 6,
  },
  listeningLabel: {
    textAlign: 'center', color: '#8C6BFF', fontWeight: '800', fontSize: 12, marginTop: 6,
  },
  input: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
    minHeight: 80,
    padding: 10,
    color: '#2A3150',
    textAlignVertical: 'top',
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444', textAlign: 'center', marginTop: 8, fontWeight: '700', fontSize: 12,
  },
  coachStatusRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6,
  },
  statusDot: {
    width: 10, height: 10, borderRadius: 5,
  },
  coachTimerBar: {
    marginTop: 10,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  coachTimerFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#58CC02',
  },
  moderatorBanner: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(140, 107, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(140, 107, 255, 0.25)',
    alignItems: 'center',
  },
  moderatorBannerText: {
    color: '#8C6BFF',
    fontWeight: '800',
    fontSize: 14,
  },
  preDebateInfo: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F0FFF4',
    borderWidth: 1,
    borderColor: 'rgba(88,204,2,0.2)',
  },
  preDebateStep: {
    color: '#2A3150',
    fontWeight: '700',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 20,
  },
  preDebateNote: {
    color: '#7A84A3',
    fontWeight: '700',
    fontSize: 11,
    marginTop: 10,
    fontStyle: 'italic',
  },
  resultWrap: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F7F9FF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  resultHeading: { color: '#1E2440', fontWeight: '900', fontSize: 16 },
  resultLine: { color: '#2A3150', marginTop: 4, fontWeight: '700' },
  resultBody: { color: '#57628A', marginTop: 6, fontWeight: '600', lineHeight: 18 },
});

import React, { useMemo, useCallback } from 'react';
import { Animated, StyleSheet, Text, View, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useConversation } from '@elevenlabs/react-native';
import Bouncy3DButton from '../../components/Bouncy3DButton';
import { apiJson } from '../../lib/api';
import { startRecording, stopRecording, cancelRecording, requestMicPermission } from '../../lib/voice';
import { getCoachSessionConfig } from '../../lib/voice/elevenlabs';

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

  const pendingSubmissionsRef = React.useRef([]);
  const actionLockRef = React.useRef(false);
  const recordingStartedRef = React.useRef(false);

  const conversation = useConversation({
    onConnect: () => setCoachStatus('connected'),
    onDisconnect: () => setCoachStatus('disconnected'),
    onError: (message) => {
      console.error('Coach conversation error:', message);
      setCoachStatus('error');
    },
    onModeChange: ({ mode: m }) => {
      setCoachSpeaking(m === 'speaking');
    },
    onStatusChange: ({ status }) => setCoachStatus(status),
  });

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

  // Auto-start mic for debate or non-coach practice on mount
  React.useEffect(() => {
    if (isCoachMode) return;
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
  }, [isCoachMode]);

  // Auto-start coach session on mount
  React.useEffect(() => {
    if (!isCoachMode) return;
    let cancelled = false;
    (async () => {
      try {
        setCoachStatus('connecting');
        const config = getCoachSessionConfig({
          exerciseType,
          prompt: prompt || topic,
          profile: coachProfile,
        });
        await conversation.startSession(config);
      } catch (err) {
        console.error('Failed to start coach session:', err);
        if (!cancelled) setCoachStatus('error');
      }
    })();
    return () => {
      cancelled = true;
      conversation.endSession().catch(() => {});
    };
  }, [isCoachMode]);

  // Timer for debate and non-coach practice modes
  React.useEffect(() => {
    if (isCoachMode) return;
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
  }, [secondsLeft, finishing, isCoachMode]);

  const currentSpeaker = turnIndex % 2 === 0 ? 'A' : 'B';

  const handleDebateTurnSubmit = useCallback(async () => {
    if (actionLockRef.current || finishing) return;
    actionLockRef.current = true;

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
      speaker: currentSpeaker,
      turnIndex,
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

    if (turnIndex < 3) {
      setTurnIndex((prev) => prev + 1);
      setSecondsLeft(15);
      actionLockRef.current = false;
      // Start recording for next turn
      try {
        await startRecording();
        setMicActive(true);
        recordingStartedRef.current = true;
      } catch (err) {
        console.error('Failed to restart recording:', err);
        setMicError('Mic restart failed — use text fallback.');
      }
      return;
    }

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
  }, [finishing, debateId, currentSpeaker, turnIndex, transcriptInput]);

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
      <Text style={styles.roomName}>Live Coach Session</Text>
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
            ? (coachSpeaking ? 'Coach is speaking...' : 'Coach is listening...')
            : coachStatus === 'connecting' ? 'Connecting to coach...'
            : coachStatus === 'error' ? 'Connection error'
            : 'Disconnected'}
        </Text>
      </View>
    </View>
  );

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
            <Text style={styles.topicLabel}>Turn {turnIndex + 1}/4 • Speaker {currentSpeaker} • {secondsLeft}s left</Text>
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
          isCoachMode && coachStatus === 'connected' && styles.micWrapActive,
        ]}>
          <Text style={styles.mic}>{micActive || (isCoachMode && coachStatus === 'connected') ? '🎙️' : '🔇'}</Text>
        </Animated.View>

        {!!micError && <Text style={styles.errorText}>{micError}</Text>}

        {/* Text fallback for when mic fails (debate + generic practice) */}
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

        {!result && !isCoachMode && (
          <Bouncy3DButton
            title={isDebateMode ? (turnIndex < 3 ? 'Submit turn and switch speaker' : 'Submit final turn') : 'Stop and reflect'}
            variant="green"
            onPress={isDebateMode ? handleDebateTurnSubmit : handlePracticeStop}
            style={{ marginTop: 16 }}
          />
        )}

        {isCoachMode && coachStatus === 'connected' && (
          <Bouncy3DButton
            title="End coach session"
            variant="green"
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

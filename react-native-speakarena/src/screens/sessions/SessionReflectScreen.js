import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useConversation } from '@elevenlabs/react-native';
import Bouncy3DButton from '../../components/Bouncy3DButton';
import { TRACKS } from '../../data/tracks';
import { getDebriefSessionConfig } from '../../lib/voice/elevenlabs';

export default function SessionReflectScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
  const track = TRACKS[trackId] || TRACKS.persuasive;
  const feedback = route.params?.feedback || null;
  const debateResult = route.params?.debateResult || null;
  const topic = route.params?.topic || '';
  const nextFocusText = feedback?.top_weakness || track.reflection;
  const improvedText = feedback?.top_strength || 'Your structure was clear and easy to follow.';
  const scoreText = typeof feedback?.overall_score === 'number' ? `Score: ${feedback.overall_score}/100` : '';

  const [debriefStatus, setDebriefStatus] = React.useState('idle');
  const [debriefSpeaking, setDebriefSpeaking] = React.useState(false);
  const debriefStartedRef = React.useRef(false);

  const conversation = useConversation({
    onConnect: () => setDebriefStatus('connected'),
    onDisconnect: () => setDebriefStatus('disconnected'),
    onError: (msg) => {
      console.error('Debrief error:', msg);
      setDebriefStatus('error');
    },
    onModeChange: ({ mode }) => setDebriefSpeaking(mode === 'speaking'),
    onStatusChange: ({ status }) => setDebriefStatus(status),
  });

  React.useEffect(() => {
    if (!debateResult || debriefStartedRef.current) return;
    debriefStartedRef.current = true;
    let cancelled = false;

    (async () => {
      try {
        // Allow any previous session cleanup from the prior screen to settle
        await new Promise((r) => setTimeout(r, 500));
        if (cancelled) return;
        setDebriefStatus('connecting');
        const config = getDebriefSessionConfig({ debateResult, topic });
        await conversation.startSession(config);
      } catch (err) {
        console.error('Failed to start debrief:', err);
        if (!cancelled) setDebriefStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      conversation.endSession().catch(() => {});
    };
  }, [debateResult]);

  const handleEndDebrief = async () => {
    try { await conversation.endSession(); } catch {}
    setDebriefStatus('disconnected');
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>REFLECT</Text>

        {!!debateResult && (
          <Text style={styles.text}>
            Debate winner: {debateResult.winner || 'pending'} | A: {debateResult.score_a ?? '-'} | B: {debateResult.score_b ?? '-'}
          </Text>
        )}

        <Text style={styles.good}>What improved</Text>
        <Text style={styles.text}>{improvedText}</Text>

        <Text style={[styles.good, { marginTop: 12 }]}>Next focus</Text>
        <Text style={styles.text}>{nextFocusText}</Text>
        {!!feedback?.one_line_feedback && <Text style={styles.text}>{feedback.one_line_feedback}</Text>}
        {!!scoreText && <Text style={styles.text}>{scoreText}</Text>}

        {!!debateResult && debriefStatus !== 'idle' && (
          <View style={styles.debriefWrap}>
            <View style={styles.debriefRow}>
              <View style={[styles.debriefDot, {
                backgroundColor: debriefStatus === 'connected' ? '#10B981'
                  : debriefStatus === 'connecting' ? '#F59E0B'
                  : debriefStatus === 'error' ? '#EF4444' : '#9CA3AF',
              }]} />
              <Text style={styles.debriefLabel}>
                {debriefStatus === 'connected'
                  ? (debriefSpeaking ? 'Debrief agent speaking...' : 'Debrief agent listening...')
                  : debriefStatus === 'connecting' ? 'Starting debrief...'
                  : debriefStatus === 'error' ? 'Debrief unavailable'
                  : 'Debrief ended'}
              </Text>
            </View>
            {debriefStatus === 'connected' && (
              <Bouncy3DButton title="End debrief" variant="white" onPress={handleEndDebrief} style={{ marginTop: 8 }} />
            )}
          </View>
        )}

        <Bouncy3DButton title="Retry with this change" variant="green" onPress={() => navigation.navigate('SessionRetry', { trackId })} style={{ marginTop: 16 }} />
        <Bouncy3DButton title="Coach hints" variant="white" onPress={() => navigation.navigate('CoachHints', { feedback })} style={{ marginTop: 10 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(0,0,0,0.07)' },
  title: { color: '#4B4B4B', fontSize: 22, fontWeight: '900' },
  good: { color: '#4B4B4B', fontWeight: '900', marginTop: 10 },
  text: { color: '#6F76A1', marginTop: 4, fontWeight: '700', lineHeight: 20 },
  debriefWrap: {
    marginTop: 14, padding: 12, borderRadius: 12,
    backgroundColor: '#F0F4FF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)',
  },
  debriefRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  debriefDot: { width: 10, height: 10, borderRadius: 5 },
  debriefLabel: { color: '#57628A', fontWeight: '700', fontSize: 12 },
});

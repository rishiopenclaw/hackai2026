import React from 'react';
import { ActivityIndicator, Alert, Linking, StyleSheet, Text, View } from 'react-native';
import Bouncy3DButton from '../../components/Bouncy3DButton';
import { TRACKS } from '../../data/tracks';
import { apiJson, getDemoUserId } from '../../lib/api';
import { requestMicPermission, getMicPermissionStatus } from '../../lib/voice';

export default function SessionPreflightScreen({ route, navigation }) {
  const trackId = route.params?.trackId || 'persuasive';
  const track = TRACKS[trackId] || TRACKS.persuasive;
  const [promptState, setPromptState] = React.useState({
    prompt: route.params?.prompt || track.prompt,
    instructions: '',
    whyThis: '',
  });
  const [loadingPrompt, setLoadingPrompt] = React.useState(false);
  const [micStatus, setMicStatus] = React.useState('undetermined');
  const isInterviewTrack = trackId === 'human';

  React.useEffect(() => {
    getMicPermissionStatus().then(setMicStatus);
  }, []);

  const fetchPersonalizedPrompt = React.useCallback(
    async (exerciseType = 'behavioral') => {
      setLoadingPrompt(true);
      try {
        const userId = await getDemoUserId();
        if (!userId) return;
        const profileRes = await apiJson(`/api/profiles/${userId}`);
        const profile = profileRes?.user || {};
        const questionRes = await apiJson('/api/gemini/question', {
          method: 'POST',
          body: JSON.stringify({
            profile,
            weakAreas: profile.speakingWeaknesses || [],
            exerciseType,
          }),
        });
        const question = questionRes?.question || {};
        setPromptState({
          prompt: question.prompt || track.prompt,
          instructions: question.instructions || '',
          whyThis: question.why_this || '',
        });
      } catch (error) {
        console.error('Failed to fetch personalized prompt', error);
      } finally {
        setLoadingPrompt(false);
      }
    },
    [track.prompt],
  );

  React.useEffect(() => {
    if (isInterviewTrack) {
      fetchPersonalizedPrompt('behavioral');
    }
  }, [isInterviewTrack, fetchPersonalizedPrompt]);

  const ensureMicPermission = async () => {
    if (micStatus === 'granted') return true;
    const granted = await requestMicPermission();
    setMicStatus(granted ? 'granted' : 'denied');
    if (!granted) {
      Alert.alert(
        'Microphone Required',
        'SpeakArena needs microphone access for voice sessions. Please enable it in Settings.',
        [
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
          { text: 'Cancel', style: 'cancel' },
        ],
      );
      return false;
    }
    return true;
  };

  const startSession = async () => {
    const micOk = await ensureMicPermission();
    if (!micOk) return;

    if (isInterviewTrack) {
      navigation.navigate('PromptPicker', {
        trackId,
        initialPrompt: promptState.prompt,
      });
      return;
    }
    navigation.navigate('SessionLive', {
      trackId,
      prompt: promptState.prompt,
      durationSeconds: track.durationMin * 60,
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.prompt}>{promptState.prompt}</Text>
        {!!promptState.instructions && <Text style={styles.hint}>{promptState.instructions}</Text>}
        {!!promptState.whyThis && <Text style={styles.hint}>{promptState.whyThis}</Text>}
        <Text style={styles.hint}>{track.focusHint}</Text>

        {micStatus === 'denied' && (
          <Text style={styles.micWarning}>Mic permission denied — tap Start to re-request or enable in Settings.</Text>
        )}

        <Bouncy3DButton title="Start speaking" variant="green" onPress={startSession} style={{ marginTop: 16 }} />
        <Bouncy3DButton
          title={isInterviewTrack ? 'Personalized prompt' : 'Change prompt'}
          variant="white"
          onPress={() => {
            if (isInterviewTrack) {
              fetchPersonalizedPrompt('behavioral');
              return;
            }
            navigation.navigate('PromptPicker');
          }}
          style={{ marginTop: 10 }}
        />
        {loadingPrompt && <ActivityIndicator size="small" color="#58CC02" style={{ marginTop: 12 }} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6', padding: 20, justifyContent: 'center' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.07)',
  },
  title: { color: '#4B4B4B', fontSize: 26, fontWeight: '900' },
  prompt: { color: '#4B4B4B', fontSize: 16, fontWeight: '800', marginTop: 10, lineHeight: 22 },
  hint: { color: '#AFAFAF', fontSize: 14, marginTop: 10, fontWeight: '700', lineHeight: 20 },
  micWarning: { color: '#EF4444', fontSize: 12, fontWeight: '700', marginTop: 10 },
});

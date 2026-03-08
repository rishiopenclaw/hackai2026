import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { palette, type } from '../../theme/design';
import { apiJson, getDemoUserId } from '../../lib/api';

const PROMPTS = [
  'Remote work improves output more than office work.',
  'Tell me about a time you handled conflict in a team.',
  'Explain a technical decision to a non-technical person.',
];

const COACH_OPTIONS = [
  { key: 'behavioral', label: 'A) Behavioral interview (STAR)' },
  { key: 'impromptu', label: 'B) Impromptu talk' },
  { key: 'elevator', label: 'C) Elevator pitch' },
];

export default function PromptPickerModal({ navigation, route }) {
  const trackId = route.params?.trackId;
  const isCoachMode = trackId === 'human';
  const [loading, setLoading] = React.useState(false);

  const startCoachExercise = async (exerciseType) => {
    setLoading(true);
    try {
      const userId = await getDemoUserId();
      const profileRes = userId ? await apiJson(`/api/profiles/${userId}`) : null;
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
      navigation.replace('SessionLive', {
        trackId: 'human',
        mode: 'coach-practice',
        prompt: question.prompt || route.params?.initialPrompt,
        instructions: question.instructions || '',
        exerciseType,
        coachProfile: profile,
        durationSeconds: 20,
      });
    } catch (error) {
      console.error('Failed to start coach exercise', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>{isCoachMode ? 'Coach exercise options' : 'Pick a prompt'}</Text>
      {isCoachMode ? (
        <View style={{ marginTop: 12, gap: 10 }}>
          {COACH_OPTIONS.map((option) => (
            <Pressable key={option.key} style={styles.item} onPress={() => startCoachExercise(option.key)}>
              <Text style={styles.itemText}>{option.label}</Text>
            </Pressable>
          ))}
          {loading && <ActivityIndicator size="small" color={palette.accent2} style={{ marginTop: 8 }} />}
        </View>
      ) : (
        <View style={{ marginTop: 12, gap: 10 }}>
          {PROMPTS.map((p) => (
            <Pressable key={p} style={styles.item} onPress={() => navigation.goBack()}>
              <Text style={styles.itemText}>{p}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F8FF', padding: 20 },
  title: { color: palette.text, ...type.display },
  item: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: palette.border, padding: 14 },
  itemText: { color: palette.text, ...type.body },
});

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import CleanCard from '../components/CleanCard';
import { PrimaryPill } from '../components/CleanCTA';
import { palette, type } from '../theme/design';

const OPTIONS = ['Interviews', 'Debates', 'Storytelling', 'General confidence'];

export default function OnboardingQuizScreen({ navigation }) {
  const [pick, setPick] = React.useState('Interviews');
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>What do you want to improve first?</Text>
        <Text style={styles.sub}>We’ll personalize your first week.</Text>

        <View style={{ marginTop: 14, gap: 8 }}>
          {OPTIONS.map((o) => (
            <Pressable key={o} onPress={() => setPick(o)}>
              <CleanCard style={[styles.option, pick === o && styles.optionActive]}>
                <Text style={[styles.optionText, pick === o && styles.optionTextActive]}>{o}</Text>
              </CleanCard>
            </Pressable>
          ))}
        </View>

        <PrimaryPill title="Continue" onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 16 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 4, ...type.body },
  option: { minHeight: 52, justifyContent: 'center' },
  optionActive: { borderColor: 'rgba(109,94,248,0.24)', backgroundColor: '#EEE9FF' },
  optionText: { color: palette.text, ...type.heading },
  optionTextActive: { color: palette.accent2 },
});

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Bouncy3DButton from '../../components/Bouncy3DButton';

export default function PracticeScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>PRACTICE</Text>
        <Text style={styles.sub}>Pick a speaking mode</Text>

        <View style={styles.stack}>
          <Bouncy3DButton title="Speak Persuasive" variant="green" onPress={() => navigation.navigate('SessionPreflight', { trackId: 'persuasive' })} />
          <Bouncy3DButton title="Think Fast" variant="blue" onPress={() => navigation.navigate('SessionPreflight', { trackId: 'fast' })} />
          <Bouncy3DButton title="Pressure Clarity" variant="orange" onPress={() => navigation.navigate('SessionPreflight', { trackId: 'pressure' })} />
          <Bouncy3DButton title="Speak Human" variant="green" onPress={() => navigation.navigate('SessionPreflight', { trackId: 'human' })} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6' },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  title: { color: '#4B4B4B', fontSize: 30, fontWeight: '900' },
  sub: { color: '#AFAFAF', fontSize: 14, marginTop: 4, fontWeight: '700' },
  stack: { marginTop: 16, gap: 12 },
});

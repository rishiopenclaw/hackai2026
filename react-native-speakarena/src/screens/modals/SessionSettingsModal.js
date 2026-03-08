import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { PrimaryPill } from '../../components/CleanCTA';
import { palette, type } from '../../theme/design';

export default function SessionSettingsModal({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Session settings</Text>
      <View style={styles.card}><Text style={styles.text}>Duration: 8 min</Text></View>
      <View style={styles.card}><Text style={styles.text}>Live transcript: On</Text></View>
      <PrimaryPill title="Done" onPress={() => navigation.goBack()} style={{ marginTop: 16 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F8FF', padding: 20 },
  title: { color: palette.text, ...type.display },
  card: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: palette.border, padding: 14, marginTop: 10 },
  text: { color: palette.text, ...type.body },
});

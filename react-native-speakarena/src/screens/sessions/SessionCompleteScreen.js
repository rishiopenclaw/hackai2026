import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Bouncy3DButton from '../../components/Bouncy3DButton';

export default function SessionCompleteScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>SESSION COMPLETE</Text>
        <Text style={styles.sub}>Nice work. You completed a focused speaking loop.</Text>

        <Bouncy3DButton title="Back to tracks" variant="green" onPress={() => navigation.navigate('PracticeHome')} style={{ marginTop: 16 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(0,0,0,0.07)' },
  emoji: { fontSize: 42, textAlign: 'center' },
  title: { color: '#4B4B4B', fontSize: 22, fontWeight: '900', textAlign: 'center', marginTop: 8 },
  sub: { color: '#6F76A1', marginTop: 8, textAlign: 'center', fontWeight: '700', lineHeight: 20 },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { palette, type } from '../theme/design';

const STEPS = ['Prompt', 'Speak', 'Reflect', 'Retry'];

export default function ProgressRibbon({ step = 0 }) {
  return (
    <View style={styles.row}>
      {STEPS.map((s, i) => (
        <View key={s} style={[styles.pill, i <= step && styles.active]}>
          <Text style={[styles.label, i <= step && styles.activeLabel]}>{s}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6, marginTop: 8 },
  pill: { flex: 1, minHeight: 28, borderRadius: 999, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: palette.border, alignItems: 'center', justifyContent: 'center' },
  active: { backgroundColor: '#EEE9FF', borderColor: 'rgba(109,94,248,0.2)' },
  label: { color: '#8B92AE', ...type.label },
  activeLabel: { color: palette.accent2 },
});

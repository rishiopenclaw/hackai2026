import React from 'react';
import { Text, StyleSheet } from 'react-native';
import CleanCard from './CleanCard';
import { palette, type } from '../theme/design';

export default function CoachHintCard({ title = 'Coach hint', text }) {
  return (
    <CleanCard>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </CleanCard>
  );
}

const styles = StyleSheet.create({
  title: { color: '#8E97AC', ...type.label, textTransform: 'uppercase', letterSpacing: 1 },
  text: { color: palette.text, marginTop: 8, ...type.heading, lineHeight: 24 },
});

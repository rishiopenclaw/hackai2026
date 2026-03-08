import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import CleanCard from './CleanCard';
import { palette, type } from '../theme/design';

export default function TrackCard({ title, subtitle, onPress, highlight }) {
  return (
    <Pressable onPress={onPress}>
      <CleanCard style={[styles.card, highlight && styles.highlight]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sub}>{subtitle}</Text>
        </View>
        <ChevronRight size={16} color="#8E95B3" />
      </CleanCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center' },
  highlight: { borderColor: 'rgba(141,123,255,0.24)' },
  title: { color: palette.text, fontSize: 16, fontWeight: '700' },
  sub: { color: palette.subtext, marginTop: 3, ...type.body },
});

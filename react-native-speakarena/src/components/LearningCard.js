import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CleanCard from './CleanCard';
import ActionRow from './ActionRow';
import { palette, type } from '../theme/design';

export default function LearningCard({ title, subtitle, primaryTitle, onPrimary, secondaryTitle, onSecondary, badge }) {
  return (
    <CleanCard>
      <View style={styles.top}>
        {badge ? <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View> : null}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sub}>{subtitle}</Text>
        </View>
      </View>
      <ActionRow primaryTitle={primaryTitle} onPrimary={onPrimary} secondaryTitle={secondaryTitle} onSecondary={onSecondary} />
    </CleanCard>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  badge: { backgroundColor: '#EEE9FF', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: palette.accent2, ...type.label },
  title: { color: palette.text, ...type.heading },
  sub: { color: palette.subtext, marginTop: 4, ...type.body },
});

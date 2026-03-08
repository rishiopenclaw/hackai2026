import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CleanShell from '../../components/CleanShell';
import CleanCard from '../../components/CleanCard';
import { palette, type } from '../../theme/design';

export default function ProgressMainScreen() {
  return (
    <CleanShell>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.sub}>Meaningful improvement over time.</Text>

      <View style={{ marginTop: 14, gap: 10 }}>
        <CleanCard>
          <Text style={styles.cardTitle}>Clarity trend</Text>
          <Text style={styles.cardSub}>Improved from 74% → 89% over recent sessions.</Text>
        </CleanCard>
        <CleanCard>
          <Text style={styles.cardTitle}>Coach notes</Text>
          <Text style={styles.cardSub}>Most common guidance: shorten opening sentence and add one concrete metric.</Text>
        </CleanCard>
      </View>
    </CleanShell>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 4, ...type.body },
  cardTitle: { color: palette.text, ...type.heading },
  cardSub: { color: palette.subtext, marginTop: 4, ...type.body },
});

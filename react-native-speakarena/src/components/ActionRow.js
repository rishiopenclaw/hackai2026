import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PrimaryPill, TextAction } from './CleanCTA';

export default function ActionRow({ primaryTitle, onPrimary, secondaryTitle, onSecondary }) {
  return (
    <View style={styles.row}>
      <PrimaryPill title={primaryTitle} onPress={onPrimary} />
      {secondaryTitle ? <TextAction title={secondaryTitle} onPress={onSecondary} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

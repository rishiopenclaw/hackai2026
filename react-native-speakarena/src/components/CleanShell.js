import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { palette } from '../theme/design';

export default function CleanShell({ children }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  inner: { flex: 1, paddingHorizontal: 18, paddingTop: 14 },
});

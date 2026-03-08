import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Bouncy3DButton from './Bouncy3DButton';

export default function LearningPathNode({ active, locked, icon, number, onPress }) {
  const variant = locked ? 'grey' : active ? 'green' : 'blue';

  return (
    <View style={styles.wrap}>
      <Bouncy3DButton
        title={icon || (number ? String(number) : '•')}
        variant={variant}
        onPress={onPress}
        style={styles.nodeBtn}
        circle
        size={68}
        textStyle={icon ? styles.iconText : styles.numberText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', width: 68, height: 68, justifyContent: 'center' },
  nodeBtn: { width: 68 },
  tipWrap: { position: 'absolute', alignItems: 'center', top: -42, zIndex: 4 },
  tip: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  tipText: { color: '#4B4B4B', fontSize: 12, fontWeight: '900', letterSpacing: 0.3 },
  tipArrow: {
    width: 10,
    height: 10,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
    marginTop: -2,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  numberText: { fontSize: 22, fontWeight: '900' },
  iconText: { fontSize: 30, fontWeight: '900', lineHeight: 30 },
});

import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Bouncy3DButton from './Bouncy3DButton';

export default function GamifiedModal({
  visible,
  title,
  subtitle,
  emoji = '🦉',
  onClose,
  onPrimary,
  onSecondary,
  primaryTitle = 'STAY',
  secondaryTitle = 'LEAVE',
}) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeTxt}>✕</Text>
          </Pressable>

          <View style={styles.emojiCircle}><Text style={styles.emoji}>{emoji}</Text></View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={{ marginTop: 16 }}>
            <Bouncy3DButton title={primaryTitle} variant="green" onPress={onPrimary} />
            <Bouncy3DButton title={secondaryTitle} variant="white" onPress={onSecondary} style={{ marginTop: 10 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
  },
  closeTxt: { color: '#7D7D7D', fontWeight: '900' },
  emojiCircle: {
    alignSelf: 'center',
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#F4F9F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 40 },
  title: { marginTop: 14, textAlign: 'center', color: '#4B4B4B', fontSize: 24, fontWeight: '900' },
  subtitle: { marginTop: 8, textAlign: 'center', color: '#AFAFAF', fontSize: 15, lineHeight: 21, fontWeight: '700' },
});

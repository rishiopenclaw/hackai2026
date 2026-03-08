import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

const PALETTE = {
  green: { fill: '#58CC02', lip: '#58A700', text: '#FFFFFF' },
  blue: { fill: '#1CB0F6', lip: '#1899D6', text: '#FFFFFF' },
  orange: { fill: '#FF9600', lip: '#E58600', text: '#FFFFFF' },
  grey: { fill: '#E5E5E5', lip: '#CECECE', text: '#4B4B4B' },
  white: { fill: '#FFFFFF', lip: '#E5E5E5', text: '#4B4B4B' },
};

export default function Bouncy3DButton({ title, variant = 'green', onPress, style, circle = false, size = 54, textStyle }) {
  const p = PALETTE[variant] || PALETTE.green;
  const press = useRef(new Animated.Value(0)).current;
  const [lip, setLip] = useState(6);
  const isFlatBlueCircle = circle && variant === 'blue';

  const pressIn = () => {
    setLip(0);
    Animated.spring(press, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  };

  const pressOut = () => {
    setLip(6);
    Animated.spring(press, { toValue: 0, useNativeDriver: true, speed: 26, bounciness: 8 }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut} style={style}>
      <Animated.View
        style={[
          styles.base,
          circle && { width: size, minHeight: size, height: size, borderRadius: size / 2, paddingHorizontal: 0 },
          {
            backgroundColor: p.fill,
            borderBottomColor: isFlatBlueCircle ? p.fill : p.lip,
            borderBottomWidth: isFlatBlueCircle ? 0 : lip,
            transform: [{ translateY: press.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }) }],
          },
        ]}
      >
        {!isFlatBlueCircle && <View style={styles.gloss} />}
        <Text style={[styles.text, { color: p.text }, textStyle]}>{String(title || '').toUpperCase()}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  gloss: {
    position: 'absolute',
    top: 5,
    left: 16,
    right: 16,
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  text: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
});

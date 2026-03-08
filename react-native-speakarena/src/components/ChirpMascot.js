import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

export default function ChirpMascot({ size = 90 }) {
  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="46" fill="#39CC5E" />
        <Circle cx="50" cy="60" r="24" fill="#FFFFFF" />
        <Circle cx="38" cy="40" r="4" fill="#1D2330" />
        <Circle cx="62" cy="40" r="4" fill="#1D2330" />
        <Rect x="41" y="48" width="18" height="7" rx="4" fill="#FD9A2B" />
      </Svg>
    </View>
  );
}

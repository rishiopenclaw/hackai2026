import React, { useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Circle } from 'react-native-svg';
import TopHeaderStats from '../../components/TopHeaderStats';
import LearningPathNode from '../../components/LearningPathNode';
import GamifiedModal from '../../components/GamifiedModal';
import Bouncy3DButton from '../../components/Bouncy3DButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const NODE_SIZE = 70;
const Y_SPACING = 130;
const X_AMPLITUDE = 60;

const generatePathData = (numNodes = 10, viewportWidth = SCREEN_WIDTH) =>
  Array.from({ length: numNodes }).map((_, i) => {
    const xOffset = Math.sin(i * 0.8) * X_AMPLITUDE;
    return {
      id: i + 1,
      centerX: viewportWidth / 2 + xOffset,
      centerY: (i + 1) * Y_SPACING,
    };
  });

const generateSvgPath = (nodes) => {
  if (!nodes.length) return '';
  let d = `M ${nodes[0].centerX} ${nodes[0].centerY}`;
  for (let i = 1; i < nodes.length; i += 1) {
    const prev = nodes[i - 1];
    const curr = nodes[i];
    const cpY = prev.centerY + (curr.centerY - prev.centerY) / 2;
    d += ` C ${prev.centerX} ${cpY}, ${curr.centerX} ${cpY}, ${curr.centerX} ${curr.centerY}`;
  }
  return d;
};

export default function HomeMainScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const MAP_WIDTH = SCREEN_WIDTH - 40; // same as map viewport width (marginHorizontal: 20)

  const nodes = useMemo(() => generatePathData(10, MAP_WIDTH), [MAP_WIDTH]);
  const pathD = useMemo(() => generateSvgPath(nodes), [nodes]);
  const CONTENT_HEIGHT = useMemo(() => (nodes.length + 1) * Y_SPACING, [nodes]);

  return (
    <View style={styles.root}>
      <TopHeaderStats />

      <Text style={styles.heading}>YOUR PATH</Text>

      <ScrollView
        style={styles.mapViewport}
        contentContainerStyle={[styles.mapContent, { height: CONTENT_HEIGHT }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Layer 1: Grass terrain + path */}
        <Svg width={MAP_WIDTH} height={CONTENT_HEIGHT} style={styles.svgLayer}>
          <Defs>
            <LinearGradient id="grassBase" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#9AE15D" />
              <Stop offset="100%" stopColor="#84D64A" />
            </LinearGradient>
            <LinearGradient id="trail" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#FFF7DD" />
              <Stop offset="100%" stopColor="#F1E0B2" />
            </LinearGradient>
          </Defs>

          <Path d={`M0 0 H${MAP_WIDTH} V${CONTENT_HEIGHT} H0 Z`} fill="url(#grassBase)" />

          {/* grass details */}
          <Circle cx="42" cy="150" r="10" fill="#78C33E" opacity="0.9" />
          <Circle cx="56" cy="160" r="7" fill="#84CF4B" opacity="0.9" />
          <Circle cx={MAP_WIDTH - 48} cy="340" r="9" fill="#78C33E" opacity="0.9" />
          <Circle cx={MAP_WIDTH - 61} cy="352" r="6" fill="#84CF4B" opacity="0.9" />
          <Circle cx="70" cy={CONTENT_HEIGHT - 190} r="11" fill="#78C33E" opacity="0.9" />
          <Circle cx="88" cy={CONTENT_HEIGHT - 178} r="7" fill="#84CF4B" opacity="0.9" />

          {/* thick trail */}
          <Path d={pathD} stroke="#DDBF78" strokeWidth="44" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          <Path d={pathD} stroke="url(#trail)" strokeWidth="32" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Path d={pathD} stroke="rgba(255,255,255,0.45)" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>

        {/* Layer 2: Nodes aligned to same coordinates */}
        {nodes.map((node, idx) => (
          <View
            key={node.id}
            style={{
              position: 'absolute',
              left: node.centerX - NODE_SIZE / 2,
              top: node.centerY - NODE_SIZE / 2,
              width: NODE_SIZE,
              height: NODE_SIZE,
            }}
          >
            <LearningPathNode
              number={node.id}
              active={idx === nodes.length - 1}
              onPress={() =>
                navigation.navigate('Practice', {
                  screen: 'SessionPreflight',
                  params: { trackId: 'persuasive' },
                })
              }
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomCta}>
        <Bouncy3DButton title="Try challenge" variant="orange" onPress={() => setOpen(true)} />
      </View>

      <GamifiedModal
        visible={open}
        title="Keep your momentum?"
        subtitle="You’re one lesson away from keeping your consistency alive."
        emoji="🔥"
        primaryTitle="STAY"
        secondaryTitle="LEAVE"
        onClose={() => setOpen(false)}
        onPrimary={() => setOpen(false)}
        onSecondary={() => setOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F9F6' },
  heading: {
    color: '#4B4B4B',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    marginTop: 6,
  },
  mapViewport: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    backgroundColor: '#89E256',
  },
  mapContent: {
    backgroundColor: '#89E256',
  },
  svgLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomCta: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    paddingTop: 10,
    backgroundColor: '#F4F9F6',
  },
});

import React, { useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import TopHeaderStats from '../../components/TopHeaderStats';
import LearningPathNode from '../../components/LearningPathNode';
import GamifiedModal from '../../components/GamifiedModal';
import Bouncy3DButton from '../../components/Bouncy3DButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const NODE_SIZE = 70;
const Y_SPACING = 130;
const X_AMPLITUDE = 60;

const generatePathData = (numNodes = 10) =>
  Array.from({ length: numNodes }).map((_, i) => {
    const xOffset = Math.sin(i * 0.8) * X_AMPLITUDE;
    return {
      id: i + 1,
      centerX: SCREEN_WIDTH / 2 + xOffset,
      centerY: (i + 1) * Y_SPACING,
    };
  });

const generateSvgPath = (nodes) => {
  if (!nodes.length) return '';
  let path = `M ${nodes[0].centerX} ${nodes[0].centerY}`;

  for (let i = 1; i < nodes.length; i += 1) {
    const prev = nodes[i - 1];
    const curr = nodes[i];
    const cp1Y = prev.centerY + (curr.centerY - prev.centerY) / 2;
    path += ` C ${prev.centerX} ${cp1Y}, ${curr.centerX} ${cp1Y}, ${curr.centerX} ${curr.centerY}`;
  }

  return path;
};

export default function HomeMainScreen({ navigation }) {
  const [open, setOpen] = useState(false);

  const nodes = useMemo(() => generatePathData(10), []);
  const svgPathString = useMemo(() => generateSvgPath(nodes), [nodes]);
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
        {/* Layer 1: path from same math source as nodes */}
        <Svg style={StyleSheet.absoluteFillObject}>
          <Path
            d={svgPathString}
            stroke="#E5C07B"
            strokeWidth={44}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d={svgPathString}
            stroke="#FFF1C1"
            strokeWidth={32}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>

        {/* Layer 2: nodes from exact same coordinate array */}
        {nodes.map((node, idx) => (
          <View
            key={node.id}
            style={[
              styles.nodeContainer,
              {
                left: node.centerX - NODE_SIZE / 2,
                top: node.centerY - NODE_SIZE / 2,
                width: NODE_SIZE,
                height: NODE_SIZE,
              },
            ]}
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
  nodeContainer: {
    position: 'absolute',
  },
  bottomCta: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    paddingTop: 10,
    backgroundColor: '#F4F9F6',
  },
});

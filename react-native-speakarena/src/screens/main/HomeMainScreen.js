import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TopHeaderStats from '../../components/TopHeaderStats';
import LearningPathNode from '../../components/LearningPathNode';
import GamifiedModal from '../../components/GamifiedModal';
import Bouncy3DButton from '../../components/Bouncy3DButton';

export default function HomeMainScreen({ navigation }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.root}>
      <TopHeaderStats />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>YOUR PATH</Text>

        {/* Terrain layers (grass + hills) */}
        <View style={styles.terrainWrap}>
          <View style={[styles.hill, styles.hillA]} />
          <View style={[styles.hill, styles.hillB]} />
          <View style={[styles.hill, styles.hillC]} />

          <View style={[styles.grassBlob, styles.grass1]} />
          <View style={[styles.grassBlob, styles.grass2]} />
          <View style={[styles.grassBlob, styles.grass3]} />
          <View style={[styles.grassBlob, styles.grass4]} />

          {/* Path segments */}
          <View style={[styles.pathSeg, styles.seg1]} />
          <View style={[styles.pathSeg, styles.seg2]} />
          <View style={[styles.pathSeg, styles.seg3]} />
          <View style={[styles.pathSeg, styles.seg4]} />

          {/* Nodes anchored on path */}
          <View style={[styles.nodePos, styles.node1]}>
            <LearningPathNode
              active
              number={1}
              onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'persuasive' } })}
            />
          </View>

          <View style={[styles.nodePos, styles.node2]}>
            <LearningPathNode
              number={2}
              onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'fast' } })}
            />
          </View>

          <View style={[styles.nodePos, styles.node3]}>
            <LearningPathNode
              number={3}
              onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'pressure' } })}
            />
          </View>

          <View style={[styles.nodePos, styles.node4]}>
            <LearningPathNode locked icon="🔒" />
          </View>
        </View>

        <Bouncy3DButton title="Try challenge" variant="orange" onPress={() => setOpen(true)} style={{ marginTop: 16 }} />
      </ScrollView>

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
  content: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 24 },
  heading: { color: '#4B4B4B', fontSize: 15, fontWeight: '900', letterSpacing: 1, marginBottom: 10 },

  terrainWrap: {
    height: 650,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#BDEB92',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    position: 'relative',
  },

  hill: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#A9DF7A',
  },
  hillA: { width: 300, height: 180, top: -40, left: -60 },
  hillB: { width: 280, height: 170, top: 180, right: -70, backgroundColor: '#A2DB72' },
  hillC: { width: 320, height: 190, bottom: -50, left: -80, backgroundColor: '#9DD66D' },

  grassBlob: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#8ECE58',
    opacity: 0.95,
  },
  grass1: { width: 120, height: 70, top: 100, left: 14 },
  grass2: { width: 160, height: 90, top: 290, left: 180, backgroundColor: '#86C94F' },
  grass3: { width: 110, height: 64, top: 470, left: 40, backgroundColor: '#84C64C' },
  grass4: { width: 130, height: 78, top: 520, right: 22, backgroundColor: '#87C951' },

  pathSeg: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 120,
    borderWidth: 16,
    borderColor: '#F8EFCF',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    opacity: 0.96,
  },
  seg1: { top: 26, left: 124, transform: [{ rotate: '160deg' }] },
  seg2: { top: 180, left: 42, transform: [{ rotate: '-24deg' }] },
  seg3: { top: 336, left: 126, transform: [{ rotate: '168deg' }] },
  seg4: { top: 492, left: 44, transform: [{ rotate: '-20deg' }] },

  nodePos: { position: 'absolute' },
  node1: { top: 70, left: 240 },
  node2: { top: 226, left: 88 },
  node3: { top: 384, left: 236 },
  node4: { top: 540, left: 92 },
});

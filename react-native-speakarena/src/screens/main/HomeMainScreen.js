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

        <LearningPathNode active number={1} onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'persuasive' } })} />
        <LearningPathNode number={2} onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'fast' } })} />
        <LearningPathNode number={3} onPress={() => navigation.navigate('Practice', { screen: 'SessionPreflight', params: { trackId: 'pressure' } })} />
        <LearningPathNode locked icon="🔒" />

        <Bouncy3DButton title="Try challenge" variant="orange" onPress={() => setOpen(true)} style={{ marginTop: 18 }} />
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
  heading: { color: '#4B4B4B', fontSize: 15, fontWeight: '900', letterSpacing: 1, marginBottom: 8 },
});

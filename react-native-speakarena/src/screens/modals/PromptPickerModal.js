import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { palette, type } from '../../theme/design';

const PROMPTS = [
  'Remote work improves output more than office work.',
  'Tell me about a time you handled conflict in a team.',
  'Explain a technical decision to a non-technical person.',
];

export default function PromptPickerModal({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Pick a prompt</Text>
      <View style={{ marginTop: 12, gap: 10 }}>
        {PROMPTS.map((p) => (
          <Pressable key={p} style={styles.item} onPress={() => navigation.goBack()}>
            <Text style={styles.itemText}>{p}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F8FF', padding: 20 },
  title: { color: palette.text, ...type.display },
  item: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: palette.border, padding: 14 },
  itemText: { color: palette.text, ...type.body },
});

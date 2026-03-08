import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import CleanCard from '../components/CleanCard';
import { PrimaryPill, TextAction } from '../components/CleanCTA';
import { palette, type } from '../theme/design';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.sub}>Continue your practice.</Text>

        <CleanCard style={{ marginTop: 14 }}>
          <TextInput placeholder="Email" placeholderTextColor="#8D93AE" style={styles.input} />
          <View style={styles.sep} />
          <TextInput placeholder="Password" placeholderTextColor="#8D93AE" secureTextEntry style={styles.input} />
        </CleanCard>

        <PrimaryPill title="Continue" onPress={() => navigation.replace('MainTabs')} style={{ marginTop: 14 }} />
        <TextAction title="Create account" onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 8 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 4, ...type.body },
  input: { color: palette.text, fontSize: 16, paddingVertical: 10 },
  sep: { height: 1, backgroundColor: 'rgba(66,74,140,0.12)' },
});

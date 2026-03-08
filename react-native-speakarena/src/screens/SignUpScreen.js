import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import CleanCard from '../components/CleanCard';
import { PrimaryPill, TextAction } from '../components/CleanCTA';
import { palette, type } from '../theme/design';

export default function SignUpScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.sub}>Start your speaking journey.</Text>

        <CleanCard style={{ marginTop: 14 }}>
          <TextInput placeholder="Name" placeholderTextColor="#8D93AE" style={styles.input} />
          <View style={styles.sep} />
          <TextInput placeholder="Email" placeholderTextColor="#8D93AE" style={styles.input} />
          <View style={styles.sep} />
          <TextInput placeholder="Password" placeholderTextColor="#8D93AE" secureTextEntry style={styles.input} />
        </CleanCard>

        <PrimaryPill title="Create account" onPress={() => navigation.replace('MainTabs')} style={{ marginTop: 14 }} />
        <TextAction title="I already have an account" onPress={() => navigation.navigate('Login')} style={{ marginTop: 8 }} />
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

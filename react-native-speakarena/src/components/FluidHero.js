import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const FLUID_HTML = `<!DOCTYPE html><html><body style="margin:0;background:#120A05;"></body></html>`;
const FLUID_WEB_PATH = '/fluid-molten-amber.html';
export default function FluidHero() {
  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        {Platform.OS === 'web' ? (
          <View
            style={styles.webFrame}
            dangerouslySetInnerHTML={{
              __html: `<iframe title="Fluid Hero" src="${FLUID_WEB_PATH}" style="width:100%;height:100%;border:0;display:block;" allow="autoplay; fullscreen"></iframe>`,
            }}
          />
        ) : (
          <WebView
            source={{ html: FLUID_HTML, baseUrl: '' }}
            originWhitelist={['*']}
            style={styles.webview}
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            overScrollMode="never"
            bounces={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: '#090A10',
  },
  inner: {
    flex: 1,
    backgroundColor: '#090A10',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webFrame: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
});

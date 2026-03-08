import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const FLUID_URL = 'https://volumetric-fluids.vercel.app';

function WebIframe() {
  return (
    <View
      style={styles.webFrame}
      dangerouslySetInnerHTML={{
        __html: `<iframe src="${FLUID_URL}" style="width:100%;height:100%;border:0;display:block;" allow="autoplay; fullscreen"></iframe>`,
      }}
    />
  );
}

export default function FluidHero() {
  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        {Platform.OS === 'web' ? (
          <WebIframe />
        ) : (
          <WebView
            source={{ uri: FLUID_URL }}
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

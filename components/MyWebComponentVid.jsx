import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export const MyWebComponentVid = ({ youtube }) => {
  return (
    <View androidHardwareAccelerationDisabled style={style.webview}>
      <WebView
        androidHardwareAccelerationDisabled
        useOnRenderProcessGone="true"
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={false} // Allows autoplay
        allowsInlineMediaPlayback={true} // Allows video to play inline
        useWebKit={true}
        allowsFullscreenVideo
        source={{
          uri: `
http://app.teachersvision.co.in/#/account/watch?url=${youtube}
`,
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  webview: { width: 363, height: 200, opacity: 0.99 },
});

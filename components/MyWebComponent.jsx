import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import Webview from "../screens/Webview";

// ...
export const MyWebComponent = () => {
  return (
    <View style={style.webview}>
      <WebView
        allowsFullscreenVideo
        basicAuthCredential={false}

        source={{
          uri: "http://app.teachersvision.co.in/#app/student/daily-feed/video",
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  webview: { width: 350, height: 600 },
});

import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const VideoTest = () => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: "https://www.youtube.com/embed/HBH6qnj0trU" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VideoTest;

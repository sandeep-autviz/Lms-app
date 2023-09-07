import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const CustomPlayer = ({ videoId }) => {
  // Define the YouTube URL with the video ID
  const youtubeUrl = `https://www.youtube.com/embed/8nxrHLQ_YQk?si=D9ZH8duGGUa3EsC1`;

  return (
    <View
      renderToHardwareTextureAndroid={true}
      style={{ flex: 1, opacity: 0.99, overflow: "hidden" }}
    >
      <WebView
        androidLayerType="software"
        style={{ opacity: 0.99, overflow: "hidden" }}
        androidHardwareAccelerationDisabled={true}
        // source={{ uri: youtubeUrl }}
        source={{
          uri: "http://app.teachersvision.co.in/#app/student/daily-feed/video",
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        onShouldStartLoadWithRequest={(request) => {
          return false;
        }}
      />
    </View>
  );
};

export default CustomPlayer;

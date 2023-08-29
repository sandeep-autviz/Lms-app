import React from "react";
import { View, StyleSheet } from "react-native";
import YouTube from "react-native-youtube";
import { ViewPropTypes } from "deprecated-react-native-prop-types";

const VideoPlayer = () => {
  return (
    <ViewPropTypes style={styles.container}>
      <YouTube
        videoId="N18czV5tj5o"
        play={true}
        fullscreen={true}
        loop={false}
        apiKey="AIzaSyBUvxOUqaZWfuJ8i-5QlOLNmisWD7dcf58"
        onReady={(e) => console.log("onReady", e)}
        onChangeState={(e) => console.log("onChangeState", e)}
        onChangeQuality={(e) => console.log("onChangeQuality", e)}
        onError={(e) => console.log("onError", e)}
      />
    </ViewPropTypes>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default VideoPlayer;

import React, { Component } from "react";
import { View } from "react-native";
import Video from "react-native-video";
import {
  VideoPlayer,
  DefaultMainControl,
  DefaultBottomControlsBar,
  videoId,
} from "react_native_youtube_streamer";

export default class App extends Component {
  render() {
    return (
      <VideoPlayer
        autoStart={false}
        mainControl={(args) => <DefaultMainControl {...args} />}
        bottomControl={(args) => <DefaultBottomControlsBar {...args} />}
        videoId="tsPSBLX1GPg" //<-- youtube-video-id -->
      >
        {(args) =>
          args.youtubeCustomUrl && (
            <Video
              ref={args.playerRef}
              source={{
                uri: args.youtubeCustomUrl,
              }}
              style={styles.backgroundVideo}
              resizeMode="cover"
              paused={args.videoPaused}
              onLoad={args.onLoad}
              onProgress={args.onProgress}
              onEnd={args.onEnd}
            />
          )
        }
      </VideoPlayer>
    );
  }
}
var styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
  },
});
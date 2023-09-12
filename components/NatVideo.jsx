import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Video from "react-native-video";

export default function NatVideo() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>My Video Project </Text>

      <Video
        source={{
          uri: "https://www.youtube.com/watch?v=FnmZhXWohP0",
        }}
        style={styles.vid}
        controls={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  vid: {
    height: 300,
    width: 300,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

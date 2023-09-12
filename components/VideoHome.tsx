import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import Video from "react-native-video";
import { Alert } from "react-native";
import { trimDate, getVideoId } from "../utils/Logics";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
const shadow = generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717");
import RenderHtml from "react-native-render-html";
import { heightPercentageToDP } from "../lib/ResonsiveDimesions";
import { generateBoxShadowStyle } from "../lib/generateBoxShadow";
import NatVideo from "./NatVideo";

export default function VideoHome(props: any) {
  const [isVideoResume, setisVideoResume] = useState<boolean>(false);
  const { description, image, title, fileName, creationTime } = props.item;
  let detail = description + "";
  const [playing, setPlaying] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const [readMore, setReadMore] = useState(detail.length > 50 ? true : false);
  const source = {
    html:
      description && readMore === true
        ? `${detail.trim().slice(0, 174)}`
        : `${detail.trim()}`,
  };

  function onFullScreen() {
    console.log(" full screen");
    setFullScreen((s) => !s);
  }
  console.log(fullScreen, "iam");
  return (
    <TouchableOpacity
      onPress={() => togglePlaying}
      style={{
        paddingVertical: 13,
        paddingHorizontal: 15,
        flexDirection: "column",
        marginBottom: 30,
        height: heightPercentageToDP(30.8),
        width: wid / 1.2,
        ...shadow,
        marginRight: wid / 12,
        borderColor: "#F1F1F1",
        borderRadius: 11,
        borderStyle: "solid",
        backgroundColor: "#FAFAFB",
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
        borderWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#FAFAFB",
          borderRadius: 20,
          justifyContent: "space-between",
          borderWidth: 0,
          alignSelf: "center",
          width: "100%",
        }}
      >
        <Text allowFontScaling={false} style={styles.cardText}>
          {title}
        </Text>
        {/* <Image
          source={require("../assets/images/dots.png")}
          style={{ alignSelf: "center" }}
        /> */}
      </View>
      <Text
        allowFontScaling={false}
        style={{
          fontFamily: "Poppins-Bold",
          fontSize: 10,
          color: "#92A1B8",
          paddingHorizontal: 4,
        }}
      >
        {trimDate(creationTime)}
      </Text>

      <View>
        <NatVideo />

        {/* <YoutubeIframe
          onFullScreenChange={onFullScreen}
          height={high / 4}
          webViewStyle={{ opacity: 0.99 }}
          play={playing}
          videoId={getVideoId(fileName)}
          onChangeState={onStateChange}
          initialPlayerParams={{ controls: false }}
        /> */}
        {/* <TouchableOpacity
          // TouchableOpacity to "steal" taps
          // absolutely positioned to the top
          // height must be adjusted to
          // just cover the top 3 dots
          style={{
            top: 0,
            height: 50,
            width: "100%",
            position: "absolute",
          }}
        /> */}
        {fullScreen && (
          <View style={styles.overlay}>
            <Text>hello</Text>
          </View>
        )}
      </View>

      <View style={{ padding: 0, margin: 0, backgroundColor: "#FAFAFB" }}>
        {description != null && (
          // <Text allowFontScaling={false} style={styles.cardDesc}>
          //   {description && readMore === true ? detail.slice(0, 180) : detail}
          // </Text>
          <RenderHtml contentWidth={wid} source={source} />
        )}
        {description != null && (
          <TouchableOpacity
            style={{ marginTop: -2, padding: 0, backgroundColor: "#FAFAFB" }}
            onPress={() => {
              setReadMore(!readMore);
            }}
          >
            <Text
              style={{
                color: "#319EAE",
                fontSize: 14,
              }}
            >
              {readMore === true ? "... Read More" : "Read Less"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  image: {
    width: wid / 1.2,
    height: wid / 2.4,
    borderRadius: 10,
    alignSelf: "center",
  },
  cardDesc: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardText: {
    fontFamily: "Poppins-Bold",
    fontSize: 17,
    fontWeight: "700",
    width: "80%",
    paddingHorizontal: 4,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

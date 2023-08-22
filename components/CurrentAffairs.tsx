import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  View,
  Text,
  ScrollView,
} from "react-native";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function CurrentAffairs(props: any) {
  const { title, description, image } = props.item;

  return (
    <ScrollView
      style={{
        paddingVertical: wid / 50,
        backgroundColor: "#FAFAFB",
      }}
      contentContainerStyle={{ justifyContent: "flex-start" }}
    >
      {image ? (
        <TouchableOpacity
          style={styles.topicCntr}
          onPress={() =>
            props.navigation.navigate("Affairs", {
              item: props.item,
            })
          }
        >
          <View
            style={{
              backgroundColor: "#FAFAFB",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                backgroundColor: "transparent",
                width: wid / 5.4,
                height: 60,
              }}
              source={{ uri: `${image}` }}
            ></Image>
          </View>
          <View
            style={{
              paddingVertical: high / 180,
              // alignSelf: "flex-start",
              width: wid / 2,
              flexDirection: "column",
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                textAlignVertical: "center",
                backgroundColor: "transparent",
                marginVertical: 2,
                fontFamily: "Poppins-Bold",
                fontSize: 16,
              }}
            >
              {title}
            </Text>
            {/* {description && trimTextName(description).charAt(0) != "<" ? (
              <Text
                style={{
                  backgroundColor: "transparent",
                  marginVertical: 2,
                  fontFamily: "Poppins-Regular",
                  fontSize: 12,
                }}
              >
                {trimTextName(description)}
              </Text>
            ) : (
              <View>
                {description && (
                  // <RenderHtml
                  //   contentWidth={wid}
                  //   ignoredDomTags={ingnored}
                  //   source={source}
                  // />
                  <WebView
                    style={{
                      backgroundColor: "transparent",
                      marginTop: -10,
                      width: wid / 1.9,
                      height: high / 15.5,
                    }}
                    originWhitelist={["*"]}
                    source={{
                      html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><style>
                      body { font-size: 12px; word-wrap: break-word; overflow-wrap: }
                  </style><body>${description}</body></html>`,
                    }}
                  />
                )}
              </View>
            )} */}
          </View>
          <AntDesign name="right" size={28} color="black" />
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}
//   <Text
//     allowFontScaling={false}
//     style={{
//       fontFamily: "Poppins-Regular",
//       fontSize: 15,
//       // marginBottom: 5,

//       // right: wid / 5.1,
//       // alignSelf: "flex-start",
//       // right: wid / .2,
//       fontWeight: "700",
//     }}
//   >
//     {props.item.subjectName}
//   </Text>
//   <Text
//     allowFontScaling={false}
//     style={{
//       fontFamily: "Poppins-Regular",
//       fontSize: 9,
//       top: 10,
//       // right: wid / 5.1,
//       // alignSelf: "flex-start",
//       // right: wid / .2,
//       fontWeight: "700",
//     }}
//   >
//     {props.item.description}
//   </Text>
//   {/* <View
//       style={{
//         flexDirection: "row",
//         alignContent: "flex-end",
//         alignItems: "flex-start",
//         backgroundColor: "#FAFAFB",
//         right: wid / 20,
//       }}
//     >
//       <FontAwesome
//         name="eye"
//         size={10}
//         style={{ top: high / 186.75, color: "#8A8A8A" }}
//       />
//       <Text allowFontScaling={false} style={styles.number}>
//         {props.numTopics} Topic
//       </Text>
//     </View> */}
// </View>
// <Image
//   source={require("../assets/images/arow.png")}
//   style={{ left: 30 }}
// />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontFamily: "Poppins-Regular",
    left: wid / 50,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  topicCntr: {
    marginHorizontal: "5%",
    flexDirection: "row",
    borderRadius: 11,
    justifyContent: "space-between",
    paddingVertical: wid / 50,
    paddingHorizontal: wid / 40,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#F1F1F1",
    width: "90%",
    backgroundColor: "#FAFBFA",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

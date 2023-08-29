import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  Text,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { baseUrl } from "../utils";
import { trimDate } from "../utils/Logics";
import { btnshadow } from "../components/EnrolledCourse";
import NotificationBox from "../components/NotificationBox";

const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;
export default function JobNotification(props: any) {
  const [jobData, SetJobData] = useState<any>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  function extractInnerText(htmlString: string) {
    const strippedText = htmlString.replace(/<[^>]+>/g, "");
    return strippedText;
  }

  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((value) => {
      if (value != null) {
        Jobnotification(value);
      }
    });
  }, []);
  const calcTime = (num1: string) => {
    const slice1 = num1.slice(0, 10);

    return slice1;
  };
  const calcTime1 = (num2: string) => {
    const slice2 = num2.slice(0, 10);

    return slice2;
  };
  const trimText = (desc: any) => {
    let newDesc = desc.split(" ");
    let res = "";
    for (let i = 0; i <= 2; i++) {
      res += newDesc[i] + " ";
    }
    return res + "...";
  };
  const Jobnotification = async (token: any) => {
    var axios = require("axios");
    var data = "";
    var config = {
      method: "get",
      url: `${baseUrl}/api/services/app/JobNotificationService/GetAllJobNotifications`,
      headers: {
        Authorization: `Bearer  ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        console.log(response, "jobres");
        if (response.data.result.course == null)
          SetJobData(response.data.result);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  return (
    <ScrollView
      style={{
        height: high / 1.2,
        marginTop: high / 30,
        position: "relative",
        alignSelf: "center",
        width: wid,
        marginBottom: high / 8.68,
      }}
    >
      {jobData.map((data: any, index: number) => {
        return <NotificationBox data={data} key={index} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  searchBarContainer: {
    marginTop: high / 56.933,
    backgroundColor: "#FAFAFB",
    flexDirection: "row",
  },
  image: {
    width: wid / 5.4,
    height: wid / 5.4,
    borderRadius: 10,
    alignSelf: "center",
    // right: wid/8.8,
    // bottom: 15
  },
  number: {
    marginTop: 1.5,
    backgroundColor: "transparent",
    fontFamily: "Poppins-Regular",
    textAlign: "left",
    fontSize: 12,
    color: "#858585",
  },
  cardText: {
    textAlign: "left",

    fontFamily: "Poppins-Medium",
    fontSize: 15,
  },
  topicCntr: {
    flexDirection: "row",
    marginBottom: wid / 38.4,
    borderRadius: 11,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    borderStyle: "dotted",
    justifyContent: "space-between",
    borderColor: "#C9C17F",
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: wid / 1.1,
    backgroundColor: "#FAFAFB",
  },
});

import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  View,
  StyleSheet,
  Text,
} from "react-native";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import HeaderNav from "../components/HeaderNav";
import TestCountDownTimer from "../components/TestCountDownTimer";
import { Dimensions } from "react-native";
import axios from "axios";
import { useStateContext } from "./Context/ContextProvider";
import { baseUrl, KEYS } from "../utils";
import { StackActions, useNavigation } from "@react-navigation/native";
import CurrentSectionQuestion from "../components/CurrentSubject";
import { Storage } from "../utils/LocalStorage";
import { getData } from "../api/SubjectService/sever";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../lib/ResonsiveDimesions";
import { Question, TestSection } from "../types";
const high = Dimensions.get("window").height;
const wid = Dimensions.get("window").width;
export default function MockTestSubjectTest(props: any) {
  const { id, isReattempt, isDeleted, mockTestId, studentId } =
    props.route.params.data;
  const navigation = useNavigation();
  const [index, setIndex] = useState<number>(0);
  const [duration, setDuration] = useState<any>();
  const { access_token, userDetail } = useStateContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<string>("");
  const [currentSectionId, setCurrentSectionId] = useState<number | null>();
  const [sectionBasedTest, setSectionBasedTest] = useState<boolean>(true);
  const [testSections, setTestSections] = useState<TestSection[]>([]);
  const [testSectionsWeb, setTestSectionsWeb] = useState<TestSection[]>([]);
  const [quesData, setQuestionData] = useState<Question[]>();
  const [sectionLength, setSectionLength] = useState<number>();
  const [sectionIdx, setSectionIdx] = useState<any>(0);

  const [testSectionComingFromQuestion, setestSectionComingFromQuestion] =
    useState<any>([]);
  const [currentSectionTypeQuestoion, SetCurrentSectionTypeQuestoion] =
    useState<Question[]>();

  const nextSection = (upcomingSection: number): void => {
    Storage.setItem(
      `${KEYS.TAB}${mockTestId}`,
      JSON.stringify(upcomingSection)
    );
    Storage.setItem(`${userDetail.id}${mockTestId}`, JSON.stringify(0));

    filterTheQuestionOnUpcomingSection(quesData, upcomingSection, testSections);

    setIndex(0);
    setCurrentSection(testSections[upcomingSection]?.subject.subjectName);
    if (sectionBasedTest) {
      console.log(testSections[upcomingSection].duration);
      setDuration(testSections[upcomingSection].duration * 60000);
    }
    console.log("fkahsdfkjashdfkashfkj", duration);
    setCurrentSectionId(testSections[upcomingSection].subjectId);
    setSectionIdx(upcomingSection);
    updateUserMockTestSection(testSections[upcomingSection]);
  };

  const getQuestions = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": " application/json",
        "Abp-TenantId": "1",
      },
    };
    let url = `${baseUrl}/api/services/app/MockTestUserAns/GetMockTestById?Id=${mockTestId}`;
    if (isReattempt == "isReattempt") {
      console.log("reattempt");
      url = `${baseUrl}/api/services/app/MockTestUserAns/GetMockTestById?Id=${mockTestId}&isReattempt=true`;
    } else if (isDeleted == "isResume") {
      console.log("isResume");
      url = `${baseUrl}/api/services/app/MockTestUserAns/GetMockTestById?Id=${mockTestId}&isResume=true`;
    }
    return axios.get(url, config);
  };

  const GetUserMockTestSection = () => {
    return getData(
      `/api/services/app/MockTestUserAns/GetUserMockTestSection?mocktestId=${mockTestId}&userId=${studentId}`
    );
  };
  const timerStart = (duration: number, data: any): void => {
    const startTime = moment().subtract(5, "hours").subtract(30, "minutes");
    let endTime = moment(data.creationTime).add(duration, "minute");
    let diff = endTime.diff(startTime, "millisecond");
    if (isDeleted !== "isResume") {
      setDuration(duration * 60000);
    } else {
      diff >= 0 ? setDuration(diff) : SumbitTest("Your Time is Over...");
    }
  };
  const filterTheQuestionOnUpcomingSection = (
    ALlQuestion: Question[] | any,
    upcomingSection: number,
    AlltestTection: TestSection[] | any
  ) => {
    let FilterQuestion: any = ALlQuestion?.filter(
      (ques: any) =>
        ques.question.subjectId == testSections[upcomingSection].subjectId
    );
    if (FilterQuestion.length === 0) {
      nextSection(upcomingSection + 1);
    }
    SetCurrentSectionTypeQuestoion(FilterQuestion);
  };
  const updateUserMockTestSection = async (element: any): Promise<void> => {
    element.creationTime = moment();
    var config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": " application/json",
        "Abp-TenantId": "1",
      },
    };
    const data = JSON.stringify(element);
    try {
      const res = await axios.put(
        `http://13.126.218.96/api/services/app/MockTestUserAns/UpdateUserMockTestSection`,
        data,
        config
      );
      console.log("upated the Time", res);
    } catch (error) {
      console.log("failer to update the time");
    }
  };
  const SumbitTest = async (title: any): Promise<void> => {
    if (title) {
      await GetResultById(), await afterSubmit(title);
    } else {
      Alert.alert(
        "Are you sure...",
        "Do you want to Submit the Mocktest...!!",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "YES",
            onPress: async () => {
              await GetResultById();

              afterSubmit(null);
            },
          },
        ]
      );
    }
  };
  const afterSubmit = (title: any): void => {
    Alert.alert(
      title ? title : "Congratulation...!!",
      "Your Test is Submitted",
      [
        {
          text: "View Result",
          onPress: () => {
            navigation.dispatch(
              StackActions.replace("TestResult", { id: mockTestId })
            );
          },
        },
      ]
    );
  };
  const GetResultById = async () => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": " application/json",
          "Abp-TenantId": "1",
        },
      };
      const res = await axios.get(
        `${baseUrl}/api/services/app/MockTestResultService/GetResultById?id=${mockTestId}`,
        config
      );
      new Promise((resolve, reject) => {
        resolve;
      });

      Storage.removeItem(`${studentId}${mockTestId}`);
      if (res.data.result) SaveResult(res.data.result);
    } catch (error) {
      console.log("GetResultById API Hit Failed", error);
    }
  };
  const SaveResult = async (payload: any): Promise<void> => {
    var data = JSON.stringify(payload);
    var config = {
      method: "post",
      url: `${baseUrl}/api/services/app/MockTestUserAns/SaveResult`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "Abp-TenantId": "1",
      },
      data: data,
    };

    await axios(config)
      .then(function (response: any) {
        MarkIsSubmitted(id);
      })
      .catch(function (error: any) {
        console.log("grtResultApi Failed", error);
      });
  };
  const MarkIsSubmitted = async (id: any): Promise<void> => {
    let config: any = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": " application/json",
        "Abp-TenantId": "1",
      },
    };
    try {
      await axios.post(
        `${baseUrl}/api/services/app/EnrollMockTest/MarkIsSubmitted?id=${id}`,
        config
      );
      Storage.removeItem(`${studentId}${mockTestId}`);
      Storage.removeItem(`${KEYS.TAB}${mockTestId}`);
    } catch (error) {}
  };

  const getDataForTest = async () => {
    try {
      const [getQuestionsResponse, GetUserMockTestSectionResponse] =
        await Promise.all([getQuestions(), GetUserMockTestSection()]);
      console.log(getQuestionsResponse, "full data of tags");

      let comingSectionFromQuestion = new Set(
        getQuestionsResponse.data.result.map(
          (value: any) => value.question?.subject?.subjectName
        )
      );

      const seenSubject = new Set();

      let uniqueTestSection: any = [];

      GetUserMockTestSectionResponse?.data.forEach((element: any) => {
        if (
          !seenSubject.has(element.subject.subjectName) &&
          comingSectionFromQuestion.has(element.subject.subjectName)
        ) {
          seenSubject.add(element.subject.subjectName);
          uniqueTestSection.push(element);
        }
      });
      // console.log("uniquesTestSECTION", uniqueTestSection);
      await new Promise((resolve) => {
        setTestSections(uniqueTestSection);
        resolve("setting state Async");
      });

      setSectionLength(uniqueTestSection.length);
      setQuestionData(getQuestionsResponse.data.result);

      setSectionBasedTest(
        GetUserMockTestSectionResponse.data[sectionIdx].duration != 0
      );

      if (isDeleted == "isResume") {
        let idx: any = await Storage.getItem(`${studentId}${mockTestId}`);
        let tabIdx: any = await Storage.getItem(`${KEYS.TAB}${mockTestId}`);
        console.log(idx, tabIdx);

        setIndex(idx === null ? 0 : parseInt(idx));

        setSectionIdx(tabIdx === null ? 0 : parseInt(tabIdx));

        let currSectionForReumeTest =
          uniqueTestSection[tabIdx === null ? 0 : parseInt(tabIdx)];

        setCurrentSection(currSectionForReumeTest.subject.subjectName);

        setCurrentSectionId(currSectionForReumeTest.subjectId);

        if (GetUserMockTestSectionResponse.data[sectionIdx].duration != 0) {
          timerStart(currSectionForReumeTest.duration, currSectionForReumeTest);
        } else {
          timerStart(
            getQuestionsResponse?.data.result[index].mockTest.duration,
            uniqueTestSection[index]
          );
        }
        SetCurrentSectionTypeQuestoion(
          getQuestionsResponse?.data.result.filter(
            (_item: any) =>
              _item.question.subjectId === currSectionForReumeTest.subjectId
          )
        );

        setLoading(false);
      } else {
        setIndex(0);

        setSectionIdx(0);

        let currSectionForReattemptTest = uniqueTestSection[0];
        setCurrentSection(currSectionForReattemptTest.subject.subjectName);
        setCurrentSectionId(currSectionForReattemptTest.subjectId);
        SetCurrentSectionTypeQuestoion(
          getQuestionsResponse?.data.result.filter(
            (_item: any) =>
              _item.question.subjectId === currSectionForReattemptTest.subjectId
          )
        );
        if (GetUserMockTestSectionResponse.data[sectionIdx].duration != 0) {
          timerStart(
            GetUserMockTestSectionResponse?.data[sectionIdx].duration,
            GetUserMockTestSectionResponse.data[sectionIdx]
          );
        } else {
          timerStart(
            getQuestionsResponse?.data.result[0].mockTest.duration,
            currSectionForReattemptTest
          );
        }
      }

      setLoading(false);
    } catch (error) {
      Alert.alert("Somethig Went Wrong ..", undefined, [
        {
          text: "Ok",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
      console.log(error);
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.goBack() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    getDataForTest();
  }, []);

  console.log(testSections, "tw");

  return (
    <>
      {loading || !Array.isArray(quesData) ? (
        <View style={{ backgroundColor: "#F7F7F7", flex: 1 }}>
          <HeaderNav name="Test" navigation={props.navigation} />
          <View style={{ alignSelf: "center", top: high / 4.5 }}>
            <ActivityIndicator size="large" color="#319EAE" />
          </View>
        </View>
      ) : !loading ? (
        <View
          style={{
            backgroundColor: "#FAFAFB",
            height: "100%",
            marginBottom: 50,
          }}
        >
          <>
            <View style={{ backgroundColor: "#F7F7F7" }}>
              <HeaderNav name="Test" navigation={props.navigation} />
            </View>
            <View style={{ backgroundColor: "#FAFAFB" }}>
              <TestCountDownTimer
                SumbitTest={SumbitTest}
                quesIndexArray={currentSectionTypeQuestoion}
                duration={duration}
                index={index}
                setIndex={setIndex}
                sectionIdx={sectionIdx}
                sectionLength={sectionLength}
                nextSection={nextSection}
                currentSection={currentSection}
                CurrentSectionId={currentSectionId}
                setCurrentSectionId={setCurrentSectionId}
              />
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{
                  marginTop: heightPercentageToDP(1.5),
                  width: widthPercentageToDP(100),
                  height: high / 20,
                  backgroundColor: "#FAFBFA",
                }}
                contentContainerStyle={{
                  alignContent: "flex-start",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* {testSections?.map((data: any, idx: number) => {
                  return (
                    <View key={idx}>
                      <TouchableOpacity
                        style={{
                          marginHorizontal: 6,
                          paddingHorizontal: 10,
                          backgroundColor:
                            currentSection === data.subject.subjectName
                              ? "#319EAE"
                              : "lightgrey",
                          flexDirection: "row",
                          height: "100%",
                          borderRadius: 15,
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                        onPress={() =>
                          sectionBasedTest ? null : nextSection(idx)
                        }
                      >
                        <Text
                          style={{
                            color:
                              currentSection === data.subject.subjectName
                                ? "white"
                                : "black",
                            alignSelf: "center",
                            height: "100%",
                            fontFamily: "Poppins-Medium",
                            fontSize: 12,
                            textAlignVertical: "center",
                          }}
                        >
                          {data.subject.subjectName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })} */}

                {testSections?.map((data: any, idx: number) => {
                  return (
                    <View key={idx}>
                      <TouchableOpacity
                        style={{
                          marginHorizontal: 6,
                          paddingHorizontal: 10,
                          backgroundColor:
                            currentSection === data.subject.subjectName
                              ? "#319EAE"
                              : "lightgrey",
                          flexDirection: "row",
                          height: "100%",
                          borderRadius: 15,
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                        onPress={() =>
                          sectionBasedTest ? null : nextSection(idx)
                        }
                      >
                        <Text
                          style={{
                            color:
                              currentSection === data.subject.subjectName
                                ? "white"
                                : "black",
                            alignSelf: "center",
                            height: "100%",
                            fontFamily: "Poppins-Medium",
                            fontSize: 12,
                            textAlignVertical: "center",
                          }}
                        >
                          {data.subject.subjectName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            {/* {currentSectionTypeQuestoion?.length !== 0 && ( */}
            <CurrentSectionQuestion
              index={index}
              setIndex={setIndex}
              CurrentSectionId={currentSectionId}
              mockid={mockTestId}
              nextSection={nextSection}
              SumbitTest={SumbitTest}
              currentSectionTypeQuestoion={currentSectionTypeQuestoion}
              sectionLength={sectionLength}
              sectionIdx={sectionIdx}
              updateUserMockTestSection={updateUserMockTestSection}
              paramsData={props.route.params.data}
              studentId={studentId}
            />
            {/* )} */}
          </>
          {/* <View style={styles.bottomInfoContainer}>
            <View style={styles.bottomContainer}>
              <FontAwesome name="circle" size={10} color="#63a461" />
              <Text style={styles.bottomInfoContainer.font}>Answered</Text>
            </View>
            <View style={styles.bottomContainer}>
              <FontAwesome name="circle-thin" size={10} color="black" />
              <Text style={styles.bottomInfoContainer.font}>Not Attempted</Text>
            </View>
            <View style={styles.bottomContainer}>
              <FontAwesome name="circle" size={10} color="#DA9F2C" />
              <Text style={styles.bottomInfoContainer.font}>Not Answered</Text>
            </View>
          </View> */}
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  bottomContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomInfoContainer: {
    height: high / 25,
    backgroundColor: "#FAFAFB",
    borderTopWidth: 1,
    paddingHorizontal: wid / 15,
    justifyContent: "space-between",
    bottom: 50,
    borderTopColor: "#EFEFEF",
    flexDirection: "row",

    font: { marginLeft: 3, fontFamily: "Poppins-Regular", fontSize: 12 },
  },
});

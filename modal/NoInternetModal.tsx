import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const high = Dimensions.get("window").height;

const wid = Dimensions.get("window").width;
const NoInternetModal = ({ isConnected }: any) => (
  <Modal visible={isConnected} style={styles.modal} animationType="slide">
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Connection Lost</Text>
      <Text style={styles.modalText}>
        Oops! Looks like your device is not connected to the Internet.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Please Check Internet Connection ...
        </Text>
      </TouchableOpacity>
    </View>
  </Modal>
);
const styles = StyleSheet.create({
  // ...
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,

    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  modalText: {
    fontSize: 18,
    color: "#555",
    marginTop: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
export default NoInternetModal;

import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
// adjusts the layout correctly when the keyboard is shown
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const image = require("../A5-chatapp-assets/BackgroundImage.png");

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("white");

  const auth = getAuth();

  //sign-in logic
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          selectedColor: selectedColor,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  const handleBackgroundColor = (color) => {
    setSelectedColor(color);
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <Text style={styles.title}>Chat App</Text>

        <View style={styles.mainContainer}>
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={setName}
              value={name}
              placeholder="Enter your name"
              placeholderTextColor="#757083"
            ></TextInput>

            <Text style={styles.text}>Choose Background Color</Text>

            <View style={styles.colorOptions}>
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#090C08" }]}
                onPress={() => handleBackgroundColor("#090C08")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#474056" }]}
                onPress={() => handleBackgroundColor("#474056")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#8A95A5" }]}
                onPress={() => handleBackgroundColor("#8A95A5")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: "#B9C6AE" }]}
                onPress={() => handleBackgroundColor("#B9C6AE")}
              ></TouchableOpacity>
            </View>

            <TouchableWithoutFeedback onPress={signInUser}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Start chatting</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  innerContainer: {
    justifyContent: "center",
    width: "100%",
    flex: 1,
    marginTop: -20,
  },

  mainContainer: {
    width: "80%",
    padding: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textInput: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    // fontWeight: 300,
    fontColor: "#757083",
    opacity: 0.5,
  },

  title: {
    fontSize: 45,
    // fontWeight: 600,
    color: "#FFFFFF",
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    // fontWeight: 300,
    color: "#757083",
    opacity: 1,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#757083",
    borderRadius: 4,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },

  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 20,
  },

  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Start;

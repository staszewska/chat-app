import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const image = require("../A5-chatapp-assets/BackgroundImage.png");

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("white");

  const handleBackgroundColor = (color) => {
    setSelectedColor(color);
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.mainContainer}>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Chat", {
                name: name,
                backgroundColor: selectedColor,
              })
            }
          >
            <Text style={styles.buttonText}>Start chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  mainContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    height: "35%",
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
    alignItems: "center",
    backgroundColor: "#757083",
    borderRadius: 4,
    height: "20%",
    justifyContent: "center",
    padding: 10,
    width: "88%",
  },

  buttonText: {
    fontSize: 16,
    // fontWeight: 600,
    color: "#FFFFFF",
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

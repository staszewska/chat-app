import { React, useEffect, useState } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, background, userID } = route.params;

  const [messages, setMessages] = useState([]);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  //function to render the InputToolbar based on connection status
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  //save messages to the device's local storage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  //load messages from the device's local storage
  const loadCachedMessages = async () => {
    // The empty array is for cachedMessages in case AsyncStorage() fails when the messages item hasn’t been set yet in AsyncStorage.
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  useEffect(() => {
    let unsubscribe;
    if (isConnected === true) {
      navigation.setOptions({ title: name });

      //query to fetch messages
      const messagesQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );

      //onSnapshot listener to get real-time updates
      const unsubscribe = onSnapshot(messagesQuery, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        setMessages(newMessages);
        cacheMessages(newMessages);
      });
    } else loadCachedMessages();

    //clean up function to unsubscribe from the listener when the component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isConnected]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        user={{
          _id: userID,
        }}
        name={name}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default Chat;

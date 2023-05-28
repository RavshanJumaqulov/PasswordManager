import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  HStack,
  VStack,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Context from "../Context";
import { getAuth } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";


const AddPassword = ({ navigation }) => {
  const [account, setAccount] = useState("");
  const [data, setData] = useState({ url: "", userName: "", password: "" });

  const { password } = useContext(Context);
  password.sort((a, b) => b.id - a.id);

  const clearData = () => {
    setData({ url: "", userName: "", password: "" });
  };
  const [secure, setSecure] = useState(true);
  const [sendLoading, setSendLoading] = useState(false);

  const sendData = async () => {
    if (
      data.url.trim() !== "" &&
      data.userName.trim() !== "" &&
      data.password.trim() !== "" &&
      !!getAuth().currentUser.email &&
      !!password
    ) {
      setSendLoading(true);
      await addDoc(collection(db, "parollar"), {
        ...data,
        userEmail: getAuth().currentUser.email,
        url: data.url.toLowerCase(),
        id: password[0] === undefined ? 1 : password[0].id + 1,
      });
      setData({ url: "", userName: "", password: "" });
      setSendLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          // backgroundColor: "#fff",
          justifyContent: "flex-start",
          paddingHorizontal: 20,
          position: "relative",
        }}
      >
        <ScrollView>
        <HStack
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AntDesign
              name="left"
              size={24}
              color="black"
              onPress={() => navigation.push("Home")}
            />
            <Text
              style={{ fontWeight: "600", fontSize: 24, textAlign: "center" }}
            >
              Add New Password
            </Text>
            <AntDesign name="left" size={24} color="transparent" />
          </HStack>
          <VStack style={{ marginTop: 30 }}>
            <TextInput
              label="Enter site url address"
              style={{
                backgroundColor: "#fff",
                marginVertical: 10,
                textTransform: "lowercase",
              }}
              value={data.url}
              mode="outlined"
              onChangeText={(text) => {
                setData({ ...data, url: text });
              }}
            />

            <TextInput
              label="Enter username"
              style={{ backgroundColor: "#fff", marginVertical: 10 }}
              value={data.userName}
              mode="outlined"
              onChangeText={(text) => setData({ ...data, userName: text })}
            />

            <TextInput
              label="Enter password"
              style={{ backgroundColor: "#fff", marginVertical: 10 }}
              value={data.password}
              mode="outlined"
              onChangeText={(text) => setData({ ...data, password: text })}
              secureTextEntry={secure}
              right={
                <TextInput.Icon onPress={() => setSecure(!secure)} icon="eye" />
              }
            />
          </VStack>
          <HStack
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Button
              onPress={clearData}
              style={{
                flex: 1,
                marginHorizontal: 20,
                backgroundColor: "#d11a2a",
              }}
              title="Reset"
              leading={(props) => <Icon name="delete" {...props} />}
            />
            <Button
              onPress={sendData}
              style={{
                flex: 1,
                marginHorizontal: 20,
                backgroundColor: "#2ad1ff",
              }}
              disabled={sendLoading}
              title="Save"
              leading={(props) => <Icon name="plus" {...props} />}
              loading={sendLoading}
            />
          </HStack>
          <HStack></HStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddPassword;

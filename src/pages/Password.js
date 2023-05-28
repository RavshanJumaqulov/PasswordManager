import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { HStack } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, IconButton, ProgressBar, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Clipboard } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

const Password = ({ navigation, route }) => {
  const [secure, setSecure] = useState(true);
  const [ disable, setDisable ] = useState(true)
  const [ loading, setLoading ] = useState(false)
  const [ message, setMessage ] = useState('')

  
  const [newUrl, setNewUrl] = useState(route.params.password.url);
  const [newUserName, setNewUserName] = useState(route.params.password.userName);
  const [newPassword, setNewPassword] = useState(route.params.password.password);


  const copyUrl = () => {
    Clipboard.setString(route.params.password.url);
  };
  const copyUserName = () => {
    Clipboard.setString(route.params.password.userName);
  };
  const copyPassword = () => {
    Clipboard.setString(route.params.password.password);
  };
  
  useEffect(()=>{
    if(newUrl !== route.params.password.url || newUserName !== route.params.password.userName || newPassword !== route.params.password.password ){
      setDisable(false)
    }
    else{
      setDisable(true)
    }
  },[newUrl, newUserName, newPassword])

  const update = async () => {
    setLoading(true)
    await updateDoc(doc(db, 'parollar', route.params.password.docId), {url: newUrl ,userName: newUserName, password: newPassword}).then(()=>{
      setMessage('Password Edited')
    }).catch((error)=>{
      setMessage(error.code)
    })
    setLoading(false)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingTop: 20,
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
              Password
            </Text>
            <AntDesign name="left" size={24} color="transparent" />
          </HStack>
          <HStack style={{ justifyContent: "center" }}>
            <Image
              source={{
                uri: `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${route.params.password.url}&size=256`,
                headers: {
                  Pragma: "no-cache",
                },
                body: "Your Body goes here",
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                marginVertical: 50,
              }}
            />
          </HStack>
          <HStack style={{ alignItems: "center" }}>
            <TextInput
              label="Edit url"
              style={{ backgroundColor: "#fff", marginVertical: 10, flex: 1 }}
              value={newUrl}
              mode="outlined"
              onChangeText={(text) => setNewUrl(text)}
            />
            <IconButton
              icon="content-copy"
              iconColor={"#000"}
              size={25}
              onPress={copyUrl}
            />
          </HStack>
          <HStack style={{ alignItems: "center" }}>
            <TextInput
              label="Edit User Name"
              style={{ backgroundColor: "#fff", marginVertical: 10, flex: 1 }}
              value={newUserName}
              mode="outlined"
              onChangeText={(text) => setNewUserName(text)}
            />
            <IconButton
              icon="content-copy"
              iconColor={"#000"}
              size={25}
              onPress={copyUserName}
            />
          </HStack>
          <HStack style={{ alignItems: "center" }}>
            <TextInput
              label="Edit password"
              style={{ backgroundColor: "#fff", marginVertical: 10, flex: 1 }}
              value={newPassword}
              mode="outlined"
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry={secure}
              right={
                <TextInput.Icon onPress={() => setSecure(!secure)} icon="eye" />
              }
            />
            <IconButton
              icon="content-copy"
              iconColor={"#000"}
              size={25}
              onPress={copyPassword}
            />
          </HStack>
          <HStack style={{ justifyContent: "center", marginVertical: 50 }}>
            <Button
            onPress={update}
              mode="contained"
              disabled={loading ? loading : disable}
              loading = {loading}
              style={{
                color: "#ffffff",
                backgroundColor: disable ? '#dddddd' : "#2ad1ff",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 50,
              }}
            >
              <ProgressBar />
              Edit Password
            </Button>
          </HStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Password;

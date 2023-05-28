import { View, Text, ScrollView, Alert, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Button, HStack, Spacer, VStack } from "@react-native-material/core";
import { TextInput } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (email.trim() !== "") {
      setEmailError(false);
    }
  }, [email]);
  useEffect(() => {
    if (password.trim() !== "") {
      setPasswordError(false);
    }
  }, [password]);

  const login = () => {
    setLoading(true)
    if (email.trim() === "") {
      Alert.alert("Place, enter your email address!");
      setEmailError(true);
    } else if (password.trim() === "") {
      Alert.alert("Place, enter your password!");
      setPasswordError(true);
    } else {
      signInWithEmailAndPassword(getAuth(), email, password)
        .then(() => Alert.alert("Sign In Successfully"))
        .catch((error) => {
          if (error.code == "auth/wrong-password") {
            Alert.alert("You entered the wrong password.");
          } else if (error.code == "auth/user-not-found") {
            Alert.alert("This user does not exist.");
          } else if (error.code == "auth/network-request-failed") {
            Alert.alert("No internet connection available.");
          } else if (error.code == "auth/too-many-requests") {
            Alert.alert("You have sent too many requests.");
          } else {
            Alert.alert(error.code);
          }
        });
    }
    setLoading(false)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            paddingTop: 60,
            flex: 1,
            justifyContent: "flex-start",
            paddingHorizontal: 20,
            position: "relative",
          }}
        >
          <StatusBar />
          <VStack>
            <HStack style={{ justifyContent: "center" }}>
              <Image
                source={require("../password.png")}
                style={{ width: 100, height: 100 }}
              />
            </HStack>
            <HStack style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                Password Manages
              </Text>
            </HStack>
          </VStack>
          <VStack
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <TextInput
              mode="outlined"
              style={{ width: "100%", marginVertical: 10 }}
              label={"Email Address"}
              variant="outlined"
              value={email}
              onChangeText={(text) => setEmail(text)}
              left={<TextInput.Icon icon="email" />}
              error={emailError}
            />

            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry={secure}
              style={{ width: "100%", marginVertical: 10 }}
              value={password}
              onChangeText={(parol) => setPassword(parol)}
              left={<TextInput.Icon icon="account-key" />}
              right={
                <TextInput.Icon icon="eye" onPress={() => setSecure(!secure)} />
              }
              error={passwordError}
            />
          </VStack>
          <HStack
            style={{ marginTop: 30, display: "flex", justifyContent: "center" }}
          >
            <Button
              onPress={login}
              title="Login"
              loading={loading}
              disabled={loading}
              style={{
                backgroundColor: "#2ad1ff",
                flex: 1,
                marginHorizontal: 20,
              }}
            />
          </HStack>
          <HStack style={{ justifyContent: "center", marginTop: 30 }}>
            <Pressable
              onPress={() => navigation.push("register")}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                Not registed?{" "}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: "blue",
                  textDecorationLine: "underline",
                }}
              >
                Create an Account
              </Text>
            </Pressable>
          </HStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

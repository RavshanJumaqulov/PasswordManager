import { View, Text, ScrollView, Alert, Image, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Button, HStack, Spacer, VStack } from "@react-native-material/core";
import { TextInput } from "react-native-paper";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import "../firebase/firebase";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [secure, setSecure] = useState(true);
  const [currentSecure, setCurrentSecure] = useState(true);

  const [ loading, setLoading ] = useState(false)

  let auth = getAuth();
  let db = getDatabase();

  const registerUser = () => {
    setLoading(true)
    if (name.trim() === "") {
      Alert.alert("Place, enter your full name!");
      setNameError(true);
    } else if (email.trim() === "") {
      Alert.alert("Place, enter your email address!");
      setEmailError(true);
    } else if (password.trim() === "") {
      Alert.alert("Place, enter your password!");
      setPasswordError(true);
    } else if (confirmPassword.trim() === "") {
      Alert.alert("Place, re-enter your password!");
      setConfirmPasswordError(true);
    } else if (password !== confirmPassword) {
      Alert.alert("Place, enter your password correctly!");
      setConfirmPasswordError(true);
    } else {
      createUserWithEmailAndPassword(auth, email, password).then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          email: email,
          photoURL: null,
        }).then(() => {
          set(ref(db, `users/${auth.currentUser.uid}`), {
            id: auth.currentUser.uid,
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
            photoURL: null,
          })
            .then(() => {
              Alert.alert("Successfully!");
            })
            .catch((e) => {
              Alert.alert(e.message);
            });
        });
      });
    }
    setLoading(false)
  };

  useEffect(() => {
    if (name.trim() !== "") {
      setNameError(false);
    }
  }, [name]);
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
  useEffect(() => {
    if (confirmPassword.trim() !== "") {
      setConfirmPasswordError(false);
    }
  }, [confirmPassword]);

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

          {/* onPress={() => navigation.push("login")} */}
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
              label={"Full Name"}
              variant="outlined"
              value={name}
              onChangeText={(text) => setName(text)}
              left={<TextInput.Icon icon="account" />}
              error={nameError}
            />

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
              label="Enter Password"
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

            <TextInput
              mode="outlined"
              label="Confirm Password"
              secureTextEntry={currentSecure}
              style={{ width: "100%", marginVertical: 10 }}
              value={confirmPassword}
              onChangeText={(parol) => setConfirmPassword(parol)}
              left={<TextInput.Icon icon="account-key" />}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setCurrentSecure(!currentSecure)}
                />
              }
              error={confirmPasswordError}
            />
          </VStack>
          <HStack
            style={{ marginTop: 30, display: "flex", justifyContent: "center" }}
          >
            <Button
              onPress={registerUser}
              title="Sign Up"
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
              onPress={() => navigation.push("login")}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                Already a member?{" "}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: "blue",
                  textDecorationLine: "underline",
                }}
              >
                Log in
              </Text>
            </Pressable>
          </HStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

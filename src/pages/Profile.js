import { Avatar, HStack, Spacer, VStack } from "@react-native-material/core";
import { Pressable, ScrollView, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import PasswordStatusItem from "../component/PasswordStatusItem";
import Context from "../Context";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const { password } = useContext(Context);

  const [high, setHigh] = useState(0);

  useEffect(() => {
    let a = 0;
    password.forEach(function (item) {
      if (
        item.password.length >= 8 &&
        (item.password.includes("a") ||
          item.password.includes("b") ||
          item.password.includes("c") ||
          item.password.includes("d") ||
          item.password.includes("e") ||
          item.password.includes("f") ||
          item.password.includes("g") ||
          item.password.includes("h") ||
          item.password.includes("i") ||
          item.password.includes("j") ||
          item.password.includes("k") ||
          item.password.includes("l") ||
          item.password.includes("m") ||
          item.password.includes("n") ||
          item.password.includes("o") ||
          item.password.includes("p") ||
          item.password.includes("q") ||
          item.password.includes("r") ||
          item.password.includes("s") ||
          item.password.includes("t") ||
          item.password.includes("u") ||
          item.password.includes("v") ||
          item.password.includes("x") ||
          item.password.includes("y") ||
          item.password.includes("z") ||
          item.password.includes("w")) &&
        (item.password.includes("1") ||
          item.password.includes("2") ||
          item.password.includes("3") ||
          item.password.includes("4") ||
          item.password.includes("5") ||
          item.password.includes("6") ||
          item.password.includes("7") ||
          item.password.includes("8") ||
          item.password.includes("9") ||
          item.password.includes("0") ||
          item.password.includes("-") ||
          item.password.includes("_")) &&
        (item.password.includes("A") ||
          item.password.includes("B") ||
          item.password.includes("C") ||
          item.password.includes("D") ||
          item.password.includes("E") ||
          item.password.includes("F") ||
          item.password.includes("G") ||
          item.password.includes("H") ||
          item.password.includes("I") ||
          item.password.includes("J") ||
          item.password.includes("K") ||
          item.password.includes("L") ||
          item.password.includes("M") ||
          item.password.includes("N") ||
          item.password.includes("O") ||
          item.password.includes("P") ||
          item.password.includes("Q") ||
          item.password.includes("R") ||
          item.password.includes("S") ||
          item.password.includes("T") ||
          item.password.includes("U") ||
          item.password.includes("W") ||
          item.password.includes("X") ||
          item.password.includes("Y") ||
          item.password.includes("Z") ||
          item.password.includes("I"))
      ) {
        return (a = a + 1);
      }
    });
  }, []);

  useEffect(() => {
    if (!!getAuth().currentUser) {
      setUser(getAuth().currentUser);
    }
  }, [getAuth()]);

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <ScrollView>
        <View
          style={{
            paddingTop: 20,
            flex: 1,
            justifyContent: "flex-start",
            paddingHorizontal: 20,
            position: "relative",
          }}
        >
          <StatusBar />
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
              Profile
            </Text>
            <AntDesign name="left" size={24} color="transparent" />
          </HStack>
          <HStack style={{ justifyContent: "center", marginTop: 50 }}>
            <Pressable onPress={() => 5}>
              <Avatar
                size={100}
                style={{ backgroundColor: "#2ad1ff", color: "#fff" }}
                image={{ uri: "https://mui.com/static/images/avatar/0.jpg" }}
                icon={(props) => (
                  <Icon name="account" {...props} style={{ color: "#fff" }} />
                )}
              />
            </Pressable>
          </HStack>
          <HStack style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 20, marginTop: 15 }}>
              {user !== null ? user.displayName : ""}
            </Text>
          </HStack>
          <HStack style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 20, marginTop: 5, color: "#808080" }}>
              {user !== null ? user.email : ""}
            </Text>
          </HStack>
          <HStack style={{ justifyContent: "center" }}>
            <Button
              mode="contained"
              style={{
                marginTop: 15,
                color: "#fff",
                backgroundColor: "#2ad1ff",
              }}
            >
              Edit Profile
            </Button>
          </HStack>
          <HStack
            style={{
              borderTopColor: "#0000002f",
              borderTopWidth: 1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 30,
              marginHorizontal: -20,
              paddingHorizontal: 20,
              marginTop: 30,
              paddingTop: 10,
              justifyContent: "space-between",
            }}
          >
            <PasswordStatusItem
              status="All"
              length={password.length}
              icon={<AntDesign name="checkcircle" size={24} color="#2ad1ff" />}
            />
            <PasswordStatusItem
              status="High"
              length={high}
              icon={
                <>
                  <AntDesign name="star" size={24} color="#FFD700" />
                  <AntDesign name="star" size={24} color="#FFD700" />
                  <AntDesign name="star" size={24} color="#FFD700" />
                </>
              }
            />
            <PasswordStatusItem
              status="Low"
              length={password.length - high}
              icon={
                <>
                  <AntDesign name="star" size={24} color="#FFD700" />
                </>
              }
            />
          </HStack>
        </View>
      </ScrollView>
      <HStack
        style={{
          justifyContent: "center",
          position: "absolute",
          bottom: 50,
          justifyContent: "center",
          width: "100%",
          zIndex: 1,
        }}
      >
        <Button
          mode="contained"
          onPress={() => getAuth().signOut()}
          style={{
            color: "#ffffff",
            backgroundColor: "red",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 50,
          }}
        >
          Exit Profile
        </Button>
      </HStack>
    </SafeAreaView>
  );
};

export default Profile;

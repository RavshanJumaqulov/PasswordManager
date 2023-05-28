import {
  Avatar,
  HStack,
  IconButton,
  Spacer,
  TextInput,
  VStack,
} from "@react-native-material/core";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import PasswordItem from "../component/PasswordItem";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Context from "../Context";
import { getAuth } from "firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Password from "./Password";

export default function Home({ navigation }) {
  const { password, loading, setLoading } = useContext(Context);
  const [searchTitle, setSearchTitle] = useState("");
  const [allParols, setAllParols] = useState([]);

  useEffect(() => {
    if (!!getAuth().currentUser) {
      setAllParols(
        password.filter((el) => el.userEmail == getAuth().currentUser.email)
      );
      if (searchTitle.trim().length > 0) {
        setAllParols((parols) =>
          parols.filter((el) =>
            el.url.toLocaleLowerCase().includes(searchTitle.toLocaleLowerCase())
          )
        );
      }
    }
  }, [password, searchTitle]);

  const Stack = createNativeStackNavigator();

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
          <HStack style={{ display: "flex", alignItems: "center" }}>
            <Image
              source={require("../password.png")}
              style={{ width: 40, height: 40 }}
            />
            <VStack style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: "700", fontSize: 15 }}>Password</Text>
              <Text style={{ fontWeight: "700", fontSize: 15 }}>Manager</Text>
            </VStack>
            <Spacer />
            <View>
              <Pressable onPress={() => navigation.push("profile")}>
                <Avatar
                  size={40}
                  style={{ backgroundColor: "#2ad1ff", color: "#fff" }}
                  image={{ uri: "https://mui.com/static/images/avatar/0.jpg" }}
                  icon={(props) => (
                    <Icon name="account" {...props} style={{ color: "#fff" }} />
                  )}
                />
              </Pressable>
            </View>
          </HStack>

          <HStack
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <TextInput
              style={{ width: "100%" }}
              label="Search"
              variant="outlined"
              value={searchTitle}
              onChangeText={(e) => setSearchTitle(e)}
              trailing={(props) => (
                <IconButton
                  icon={(props) => <Icon name="magnify" {...props} />}
                  {...props}
                />
              )}
            />
          </HStack>
          <Text style={{ marginTop: 40, fontWeight: "700", fontSize: 16 }}>
            All Password
          </Text>
          <VStack mt={20} spacing={4}>
            {/* <Stack.Screen name="password" component={Password}> */}
            {allParols.map((el) => {
              return (
                <Pressable
                  key={el.id}
                  onPress={() => navigation.push("password", {password: el})}
                >
                    <PasswordItem
                      url={el.url}
                      userName={el.userName}
                      parol={el.parol}
                      id={el.id}
                      docId={el.docId}
                    />
                </Pressable>
              );
            })}
            {/* </Stack.Screen> */}
          </VStack>
        </View>
      </ScrollView>
      <IconButton
        onPress={() => navigation.push("addpassword")}
        style={{
          position: "absolute",
          backgroundColor: "blue",
          bottom: 100,
          right: 30,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#2ad1ff",
        }}
        icon={(props) => (
          <Icon name="plus" style={{ color: "#fff", fontSize: 35 }} />
        )}
      />
      {loading && (
        <VStack
          style={{
            backgroundColor: "#0000003f",
            flex: 1,
            position: "absolute",
            width: "100%",
            zIndex: 2,
            bottom: 0,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HStack
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Loading...</Text>
          </HStack>
        </VStack>
      )}
    </SafeAreaView>
  );
}

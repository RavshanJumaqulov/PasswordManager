import React, { useEffect, useState } from "react";
import Home from "./src/pages/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Context from "./src/Context";
import AddPassword from "./src/pages/AddPassword";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "./src/firebase/firebase";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Profile from "./src/pages/Profile";
import Password from "./src/pages/Password";

const Stack = createNativeStackNavigator();

export default function App() {
  const [password, setPassword] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let auth = getAuth();
  useEffect(() => {
    const q = query(collection(db, "parollar"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let newArray = [];
      querySnapshot.forEach((el) => {
        return newArray.push({ ...el.data(), docId: el.id });
      });
      setPassword(newArray);
      setLoading(false)
      return newArray;
    });
    return () => unsub();
  }, [loading]);



  useEffect(() => {
    let findOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return findOut;
  }, [auth]);

  return (
    <Context.Provider value={{ password, loading, setLoading }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="register" component={Register} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="addpassword" component={AddPassword} />
              <Stack.Screen name="profile" component={Profile} />
              <Stack.Screen name="password" component={Password} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}

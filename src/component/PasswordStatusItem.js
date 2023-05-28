import { Text } from "react-native";
import React from "react";
import { HStack, VStack } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";


const PasswordStatusItem = (props) => {
  return (
    <HStack style={{ justifyContent: "space-between" }}>
      <VStack
        style={{
          borderWidth: 1,
          borderColor: "#0000000f",
          borderRadius: 15,
          width: 100,
          height: 120,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          paddingVertical: 10,
        }}
      >
        <HStack>
          {props.icon}
        </HStack>
        <Text style={{ fontSize: 22, fontWeight: "700", marginVertical: 5 }}>
          {props.length}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#808080" }}>
          {props.status}
        </Text>
      </VStack>
    </HStack>
  );
};

export default PasswordStatusItem;

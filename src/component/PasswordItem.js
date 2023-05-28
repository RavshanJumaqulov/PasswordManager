import { Box, HStack, IconButton } from "@react-native-material/core";
import { Alert, Image, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import cheerio from "react-native-cheerio/lib/cheerio";
import { db } from "../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export default function PasswordItem(props) {
  const handleDropdown = () => {
    Alert.alert("Delete", "Remove this password from storage!", [
      {
        text: "Cancel",
        onPress: () => console.log(props.id),
      },
      { text: "OK", onPress: async (id) => {
          await deleteDoc(doc(db, `parollar`, props.docId));
      } },
    ]);
  };

  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(!!props.url && props.url)
      .then((response) => response.text())
      .then((data) => {
        const $ = cheerio.load(data);
        const title = $("title").text();
        setTitle(title);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(title);

  return (
    <Box
      style={{
        shadowColor: "#000000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        borderColor: "#0000001f",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        position: "relative",
        width: '100%'
      }}
    >
      <HStack>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${props.url}&size=256`,
              method: "POST",
              headers: {
                Pragma: "no-cache",
              },
              body: "Your Body goes here",
            }}
            style={{ width: 40, height: 40, borderRadius: 5 }}
          />
        </Box>
        <Box
          style={{
            flex: 1,
            paddingLeft: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#000000",
              lineHeight: 15,
            }}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              fontWeight: "400",
              color: "#0000009f",
              lineHeight: 15,
            }}
          >
            {props.url}
          </Text>
        </Box>
        <Box>
          <IconButton
            onPress={()=>handleDropdown(props.id)}
            icon={(props) => <Icon name="delete" {...props} />}
          />
        </Box>
      </HStack>
    </Box>
  );
}

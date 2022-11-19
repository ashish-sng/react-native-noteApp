import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Intro from "./app/screens/Intro";
import NoteScreen from "./app/screens/NoteScreen";
import NoteDetail from "./app/components/NoteDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteProvider from "./app/contexts/NoteProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
  }, []);
  if (!user.name) return <Intro onFinish={findUser} />;
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: "", headerTransparent: true }}
        >
          <Stack.Screen name="NoteScreen">
            {(props) => <NoteScreen {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="NoteDetail" component={NoteDetail} />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

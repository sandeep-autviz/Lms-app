import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
import { Provider as PaperProvider } from "react-native-paper";
import React, { useEffect } from "react";
import {
  ContextProvider,
  useStateContext,
} from "./screens/Context/ContextProvider";
import { View } from "react-native";
import StatusBarCustom from "./components/CustomStatusBar";

export default function App() {

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),

  });
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <ContextProvider>
          <PaperProvider>
            <Navigation colorScheme={colorScheme} />
          </PaperProvider>
        </ContextProvider>
      </View>
    );
  }
}

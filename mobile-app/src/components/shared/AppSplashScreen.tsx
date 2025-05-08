import { Colors } from "@/utils/constants/Colors";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";

const AppSplashScreen = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <View
        style={styles.container}
        className="bg-white items-center justify-center"
      >
        {/* <View className="flex flex-row items-center justify-center">
          <Image
            source={require("@/assets/images/imgs/logo.png")}
            resizeMode="contain"
            style={{ width: 300, height: 100, alignSelf: "center" }}
          />
        </View> */}
        <Text className="font-bold text-lg py-2">PostApp ...</Text>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});

export default AppSplashScreen;

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomStatusBar from "@/components/core/CustomStatusbar";
import { ArrowIcon } from "@/components/icons";
import { useAuth } from "@/contexts/AuthProvider";
import useStorage from "@/hooks/useStorage";
import { Colors } from "@/utils/constants/Colors";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const Profile = () => {
  const { user, setToken, setUser } = useAuth();
  const { removeData } = useStorage();

  const logout = () => {
    removeData("token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      <CustomStatusBar />
      <ThemedView className="flex-1 px-4 pt-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full justify-center items-center border border-primary"
            style={{ transform: [{ rotate: "180deg" }] }}
          >
            <ArrowIcon size={20} color={Colors.primary} />
          </Pressable>
        </View>

        {/* User Info */}
        <View className="flex-row items-center mb-6">
          <Image
            source={{
              uri:
                user?.profilePic ??
                `https://ui-avatars.com/api/?name=${user?.fullName}`,
            }}
            className="w-16 h-16 rounded-full"
            resizeMode="cover"
          />
          <View className="ml-4">
            <ThemedText className="text-xl font-semibold">
              Hello, {user?.fullName}
            </ThemedText>
            <ThemedText className="text-gray-500 mt-1">
              @{user?.username} • {user?.email}
            </ThemedText>
          </View>
        </View>

        {/* Settings */}
        <Pressable
          onPress={() => router.push("/settings")}
          className="flex-row items-center justify-between bg-gray-100 px-4 py-3 rounded-lg mb-4"
        >
          <View className="flex-row items-center">
            <AntDesign name="setting" size={22} color={Colors.primary} />
            <Text className="text-primary text-base ml-3">Settings</Text>
          </View>
          <FontAwesome6 name="chevron-right" size={16} color={Colors.primary} />
        </Pressable>

        {/* Logout */}
        <Pressable
          onPress={logout}
          className="flex-row items-center px-4 py-3 rounded-lg border border-red-300"
        >
          <AntDesign name="logout" size={22} color={Colors.primary} />
          <Text className="text-primary text-base ml-3">Logout</Text>
        </Pressable>
      </ThemedView>
    </>
  );
};

export default Profile;

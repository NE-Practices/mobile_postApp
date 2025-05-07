import ImageCarousel from "@/components/shared/ImageCarousel";
import { Colors } from "@/utils/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexPage = () => {
  const router = useRouter();

  const imageUrls = [
    require("@/assets/images/imgs/login.png"),
    require("@/assets/images/imgs/signup.png"),
  ];

  return (
    <SafeAreaView className=" flex-1" edges={[]}>
      {/* <CustomStatusBar style="light" backgroundColor={Colors.primary} /> */}
      <View className="flex-1 items-center justify-center bg-white">
        <View className="px-5 flex-col">
          <ImageCarousel
            images={imageUrls}
            renderItem={({ index }) => (
              <Image
                resizeMode="contain"
                className="object-cover w-full h-full"
                source={imageUrls[index]}
              />
            )}
          />
        </View>
        <Text className="text-primary text-xl">PostApp</Text>
        <Text className="text-center text-gray-500 mt-2 mx-3 text-base">
          Post all your thoughts, stories, and feelings freely. No filters. Just you and your voice.
        </Text>
        <Pressable
          onPress={() => router.push("/register")}
          className="bg-primary w-fit flex-row gap-x-2 items-center justify-center absolute bottom-11 text-primary p-3 px-8 pb-3.5 mb-10 rounded-full mt-3"
        >
          <Text className="text-white text-lg font-bold">Get Started</Text>
          <AntDesign name="arrowright" size={24} color={Colors["dark"].text} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default IndexPage;

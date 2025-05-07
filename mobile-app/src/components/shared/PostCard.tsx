import { View, Text, Image, Pressable, TextInput } from "react-native";
import React from "react";
import { Post } from "@/types/schema";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/utils/constants/Colors";
import { useAuth } from "@/contexts/AuthProvider";
import { Spinner } from "@ui-kitten/components";
import { Toast } from "react-native-toast-notifications";
import CommentsModal from "./CommentsModal";
import PostOptionPopup from "./PostOptionPopup";
import { router } from "expo-router";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface Props {
  post: Post;
  refetch?: () => void;
}

const PostCard = ({ post, refetch }: Props) => {
  const [comment, setComment] = React.useState("");
  const [commenting, setCommenting] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const { AuthApi } = useAuth();

  const handleComment = async () => {
    setCommenting(true);
    try {
      await AuthApi.post(`/comments`, { content: comment, postId: post.id });
      refetch?.();
      // Toast.show("Commented successfully", { type: "success" });
      setComment("");
    } catch (error) {
      console.log(error);
      Toast.show("Failed to comment", { type: "danger" });
    }
    setCommenting(false);
  };

  return (
    <View className="flex flex-col rounded-xl p-4 mt-4 bg-white border border-gray-200 shadow-md">
      {/* Header: Profile and Options */}
      <View className="flex-row items-center justify-between mb-3">
        <Pressable
          onPress={() => router.push(`/user/${post?.author?.id}`)}
          className="flex-row items-center"
        >
          <Image
            source={{
              uri:
                post?.author?.profilePic ??
                `https://ui-avatars.com/api/?name=${post?.author?.fullName}`,
            }}
            className="w-11 h-11 rounded-full"
            resizeMode="cover"
          />
          <View className="ml-3">
            <ThemedText className="font-semibold text-base text-black">
              {post?.author?.fullName.split(" ")[0]}
            </ThemedText>
            <ThemedText className="text-gray-500 text-sm">
              @{post?.author?.username} •{" "}
              {new Date(post?.createdAt).toLocaleDateString()}
            </ThemedText>
          </View>
        </Pressable>

        <PostOptionPopup post={post} refetch={refetch} />
      </View>

      {/* Title and Content */}
      <ThemedText className="text-lg font-semibold text-gray-800 mb-2">
        {post?.title}
      </ThemedText>

      {post.image && (
        <Image
          source={{ uri: post?.image }}
          className="w-full h-56 rounded-lg mb-3"
          resizeMode="cover"
        />
      )}

      <ThemedText className="text-gray-700 mb-3">{post?.content}</ThemedText>

      {/* Comments & Likes */}
      <View className="flex-row justify-between mb-3">
        <Pressable
          onPress={() => setShowComments(!showComments)}
          className="flex-row items-center"
        >
          <AntDesign name="message1" size={22} color={Colors.primary} />
          <ThemedText className="ml-2 text-sm text-gray-600">
            {post?.comments?.length} Comments
          </ThemedText>
        </Pressable>

        <Pressable className="flex-row items-center">
          <AntDesign name="like2" size={22} color={Colors.primary} />
          <ThemedText className="ml-2 text-sm text-gray-600">
            {post?.likes?.length ?? 0} Likes
          </ThemedText>
        </Pressable>
      </View>

      {/* Comment Input */}
      <View className="flex-row items-center">
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Write a comment..."
          onSubmitEditing={handleComment}
          className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm"
          placeholderTextColor="#888"
        />
        <Pressable
          onPress={handleComment}
          disabled={commenting}
          className="bg-primary p-2 rounded-lg ml-2"
        >
          {commenting ? (
            <Spinner size="small" />
          ) : (
            <AntDesign name="arrowright" size={20} color="white" />
          )}
        </Pressable>
      </View>

      {/* Comments Modal */}
      <CommentsModal
        visible={showComments}
        setVisible={setShowComments}
        postId={post.id}
      />
    </View>
  );
};

export default PostCard;

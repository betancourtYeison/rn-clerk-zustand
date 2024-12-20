import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import Toast from "react-native-root-toast";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import CounterButton from "@/components/CounterButton";
import Loading from "@/components/Loading";
import Margin from "@/components/Margin";
import PressableButton from "@/components/PressableButton";
import Text from "@/components/Text";
import { Colors } from "@/constants/Colors";
import { ConfigToast } from "@/constants/ConfigToast";
import { Post } from "@/models/post";
import usePostsStore from "@/store/usePostsStore";
import useUserStore from "@/store/useUserStore";

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.light.background};
  align-items: center;
  justify-content: center;
  padding-horizontal: 16px;
`;

const SignedInViewContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const TopViewContainer = styled.View`
  width: 100%;
  height: 45px;
  flex-direction: row;
  align-items: center;
`;

const FloatViewContainer = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100px;
`;

const PostTouchableOpacityContainer = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${Colors.light.tint};
  margin-vertical: 5px;
`;

const ContainerLottie = styled(LottieView)`
  width: 200px;
  height: 200px;
  backgroundcolor: ${Colors.light.background};
`;

const LottieLogin = require("@/assets/lottie/login.json");

export default function Page() {
  const { signOut } = useClerk();
  const { user } = useUser();

  const {
    posts,
    isLoading,
    fetchPosts,
    getPostsCount,
    setPostSelected,
    fetchCommentsByPost,
    clearPostsStore,
  } = usePostsStore();
  const { deleteItemAsync } = useUserStore();

  useEffect(() => {
    if (posts.length === 0) fetchPosts();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      deleteItemAsync();
      clearPostsStore();
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      const error = err as Error;
      Toast.show(error.message, ConfigToast);
    }
  };

  const handleCommentByPost = async (post: Post) => {
    setPostSelected(post);
    await fetchCommentsByPost(post.id);
    router.navigate("/post-detail");
  };

  return (
    <SafeAreaContainer>
      <SignedIn>
        <SignedInViewContainer>
          <Loading isLoading={isLoading} />
          <TopViewContainer>
            <Text
              label={"Hello... \n" + user?.emailAddresses[0].emailAddress}
              bold
            />
            <FloatViewContainer>
              <PressableButton
                onPress={handleSignOut}
                title="Sign out"
                bgColor={Colors.light.tint}
              />
            </FloatViewContainer>
          </TopViewContainer>
          <Margin top={20} />
          <Text label={`Posts List... (${getPostsCount()})`} />
          <FlatList
            data={posts}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <PostTouchableOpacityContainer
                onPress={() => handleCommentByPost(item)}
              >
                <Text label={`ID: ${item.id}`} bold />
                <Text label={`Title: ${item.title}`} bold />
                <Text label={`Body: ${item.body}`} />
              </PostTouchableOpacityContainer>
            )}
          />
          <CounterButton />
        </SignedInViewContainer>
      </SignedIn>
      <SignedOut>
        <ContainerLottie autoPlay source={LottieLogin} />
        <Margin top={100} />
        <PressableButton
          onPress={() => router.navigate("/(auth)/sign-in")}
          title="Sign in"
          bgColor={Colors.light.tint}
        />
        <Margin top={20} />
        <PressableButton
          onPress={() => router.navigate("/(auth)/sign-up")}
          title="Sign up"
        />
      </SignedOut>
    </SafeAreaContainer>
  );
}

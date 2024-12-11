import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import Toast from "react-native-root-toast";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import Margin from "@/components/ui/Margin";
import PressableButton from "@/components/ui/PressableButton";
import Text from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { ConfigToast } from "@/constants/ConfigToast";
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

const PostViewContainer = styled.View`
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

  const { posts, fetchPosts, getPostsCount } = usePostsStore();
  const { deleteItemAsync } = useUserStore();

  useEffect(() => {
    if (posts.length === 0) fetchPosts();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      deleteItemAsync();
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      const error = err as Error;
      Toast.show(error.message, ConfigToast);
    }
  };

  return (
    <SafeAreaContainer>
      <SignedIn>
        <SignedInViewContainer>
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
          <Text label={`Post List... (${getPostsCount()})`} />
          <FlatList
            data={posts}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <PostViewContainer>
                <Text label={`Title: ${item.title}`} bold />
                <Text label={`Body: ${item.body}`} />
              </PostViewContainer>
            )}
          />
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

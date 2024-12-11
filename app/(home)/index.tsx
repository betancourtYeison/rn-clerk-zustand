import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import Margin from "@/components/ui/Margin";
import PressableButton from "@/components/ui/PressableButton";
import Text from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.light.background};
  align-items: center;
  justify-content: center;
  padding-horizontal: 16px;
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

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaContainer>
      <SignedIn>
        <Text label={"Hello... " + user?.emailAddresses[0].emailAddress} />
        <Margin top={20} />
        <PressableButton
          onPress={handleSignOut}
          title="Sign out"
          bgColor={Colors.light.tint}
        />
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

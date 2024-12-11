import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useCallback, useState } from "react";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import Input from "@/components/ui/Input";
import Margin from "@/components/ui/Margin";
import PressableButton from "@/components/ui/PressableButton";
import Text from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { ConfigToast } from "@/constants/ConfigToast";

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.light.background};
  align-items: center;
  padding-horizontal: 16px;
`;

const ViewContainer = styled.View`
  width: 100%;
  align-items: left;
`;

const ContainerLottie = styled(LottieView)`
  width: 200px;
  height: 200px;
  backgroundcolor: ${Colors.light.background};
`;

const LottieSignin = require("@/assets/lottie/signin.json");

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        Toast.show(signInAttempt.status || "Try again...", ConfigToast);
      }
    } catch (err) {
      const error = err as Error;
      Toast.show(error.message, ConfigToast);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaContainer>
      <ContainerLottie autoPlay source={LottieSignin} />
      <Text label="Sign in" title />
      <Margin top={20} />
      <Input
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <Margin top={20} />
      <Input
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Margin top={20} />
      <PressableButton
        onPress={onSignInPress}
        title="Continue"
        bgColor={Colors.light.tint}
      />
      <Margin top={40} />
      <ViewContainer>
        <Text label="Don't have an account?" />
        <Link href="/sign-up">
          <Text label="Sign up" />
        </Link>
      </ViewContainer>
    </SafeAreaContainer>
  );
}

import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import { useCallback, useState } from "react";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import Input from "@/components/Input";
import Loading from "@/components/Loading";
import Margin from "@/components/Margin";
import PressableButton from "@/components/PressableButton";
import Text from "@/components/Text";
import { Colors } from "@/constants/Colors";
import { ConfigToast } from "@/constants/ConfigToast";
import useUserStore from "@/store/useUserStore";

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
  const { setItemAsync } = useUserStore();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSignInPress = useCallback(async () => {
    setIsLoading(true);
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
      await setItemAsync(signInAttempt.createdSessionId, signInAttempt.status);
    } catch (err) {
      const error = err as Error;
      Toast.show(error.message, ConfigToast);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaContainer>
      <Loading isLoading={isLoading} />
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

import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
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

const LottieSignup = require("@/assets/lottie/signup.json");

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      const error = err as Error;
      Toast.show(error.message, ConfigToast);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        Toast.show(signUpAttempt.status || "Try again...", ConfigToast);
      }
    } catch (err) {
      const error = err as Error;
      Toast.show(error.message, ConfigToast);
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaContainer>
        <Text label="Verify your email" />
        <Input
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <PressableButton title="Verify" onPress={onVerifyPress} />
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer>
      <ContainerLottie autoPlay source={LottieSignup} />
      <Text label="Sign up" title />
      <Margin top={20} />
      <Input
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(email) => setEmailAddress(email)}
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
        title="Continue"
        onPress={onSignUpPress}
        bgColor={Colors.light.tint}
      />
    </SafeAreaContainer>
  );
}

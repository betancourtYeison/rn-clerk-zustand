import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

interface ButtonContainerProps {
  bgColor?: string;
}

interface ButtonTextProps {
  primary?: boolean;
}

interface PressableButtonProps {
  onPress: () => void;
  bgColor?: string;
  title: string;
}

const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  width: 100%;
  height: 45px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: ${(props) =>
    props.bgColor ? "0px" : "2px solid " + Colors.light.tint};
  background-color: ${(props) => props.bgColor || Colors.light.background};
`;

const ButtonText = styled.Text<ButtonTextProps>`
  font-size: 16px;
  text-align: center;
  color: ${(props) => (props.primary ? Colors.light.white : Colors.dark.black)};
`;

const PressableButton = ({ onPress, bgColor, title }: PressableButtonProps) => (
  <ButtonContainer onPress={onPress} bgColor={bgColor}>
    <ButtonText primary={!!bgColor}>{title}</ButtonText>
  </ButtonContainer>
);

export default PressableButton;

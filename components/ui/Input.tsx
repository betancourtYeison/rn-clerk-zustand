import { Colors } from "@/constants/Colors";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";

const InputContainer = styled.TextInput`
  width: 100%;
  height: 45px;
  border-radius: 10px;
  padding-horizontal: 8px;
  border: 2px solid ${Colors.light.tint};
  background-color: ${Colors.light.background};
`;

const Input = (props: TextInputProps) => <InputContainer {...props} />;

export default Input;

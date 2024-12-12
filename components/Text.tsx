import { TextProps } from "react-native";
import styled from "styled-components/native";

import { Colors } from "@/constants/Colors";

interface CustomTextProps {
  label: string;
  title?: boolean;
  color?: string;
  bold?: boolean;
}

interface TextWrapperProps {
  title?: boolean;
  color?: string;
  bold?: boolean;
}

const TextWrapper = styled.Text<TextWrapperProps>`
  font-size: ${(props) => (props.title ? "32px" : "16px")};
  color: ${(props) => (props.color ? props.color : Colors.dark.black)};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const Text = ({ label, ...props }: CustomTextProps & TextProps) => (
  <TextWrapper {...props}>{label}</TextWrapper>
);

export default Text;

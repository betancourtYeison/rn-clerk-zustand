import { Colors } from "@/constants/Colors";
import { TextProps } from "react-native";
import styled from "styled-components/native";

interface CustomTextProps {
  label: string;
  title?: boolean;
  color?: string;
}

interface TextWrapperProps {
  title?: boolean;
  color?: string;
}

const TextWrapper = styled.Text<TextWrapperProps>`
  font-size: ${(props) => (props.title ? "32px" : "16px")};
  color: ${(props) => (props.color ? props.color : Colors.dark.black)};
`;

const Text = ({ label, ...props }: CustomTextProps & TextProps) => (
  <TextWrapper {...props}>{label}</TextWrapper>
);

export default Text;

import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

interface PressableButtonProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const MarginContainer = styled.View<PressableButtonProps>`
  margin-top: ${(props) => props.top + "px"};
  margin-right: ${(props) => props.right + "px"};
  margin-bottom: ${(props) => props.bottom + "px"};
  margin-left: ${(props) => props.left + "px"};
`;

const Margin = (props: PressableButtonProps) => <MarginContainer {...props} />;

export default Margin;

import styled from "styled-components/native";

import { Colors } from "@/constants/Colors";

interface LoadingProps {
  isLoading: boolean;
}

const ActivityIndicatorContainer = styled.ActivityIndicator`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9;
`;

const Loading = ({ isLoading }: LoadingProps) =>
  isLoading ? (
    <ActivityIndicatorContainer size="large" color={Colors.light.tint} />
  ) : null;

export default Loading;

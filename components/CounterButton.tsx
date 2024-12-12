import styled from "styled-components/native";

import { Colors } from "@/constants/Colors";
import Text from "@/components/Text";
import usePostsStore from "@/store/usePostsStore";

const FloatCounterViewContainer = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.light.tint};
`;

const CounterButton = () => {
  const { counterDetailViews } = usePostsStore();
  return (
    <FloatCounterViewContainer>
      <Text label={`${counterDetailViews}`} bold />
    </FloatCounterViewContainer>
  );
};

export default CounterButton;

import { router } from "expo-router";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import Margin from "@/components/ui/Margin";
import Text from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import usePostsStore from "@/store/usePostsStore";
import PressableButton from "@/components/ui/PressableButton";

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.light.background};
  align-items: center;
  justify-content: center;
  padding-horizontal: 16px;
`;

const ViewContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const TopViewContainer = styled.View`
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
`;

const FloatViewContainer = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100px;
`;

const PostViewContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${Colors.light.tint};
  margin-vertical: 5px;
`;

export default function Page() {
  const { postSelected, comments, getCommentsCount } = usePostsStore();

  return (
    <SafeAreaContainer>
      <ViewContainer>
        <TopViewContainer>
          <FloatViewContainer>
            <PressableButton onPress={() => router.back()} title="Back" />
          </FloatViewContainer>
          <Text label="POST DETAIL" bold />
        </TopViewContainer>
        <Margin top={20} />
        <Text label={"ID: " + postSelected?.id} bold />
        <Text label={"Title: " + postSelected?.title} bold />
        <Text label={"Body: " + postSelected?.body} />
        <Margin top={20} />
        <Text label={`Comments List... (${getCommentsCount()})`} />
        <FlatList
          data={comments}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PostViewContainer>
              <Text label={`Name: ${item.name}`} bold />
              <Text label={`Body: ${item.body}`} />
              <Text label={`Email: ${item.email}`} />
            </PostViewContainer>
          )}
        />
      </ViewContainer>
    </SafeAreaContainer>
  );
}

import React from "react";
import { useParams } from "react-router-dom";
import ImageGenLandingView from "./ImageGenLandingView";
import ImageGenConversationView from "./ImageGenConversationView";
import BasePage from "../components/BasePage";

const ImageGenPage: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  return (
    <BasePage title="图像生成">
      {conversationId ? (
        <ImageGenConversationView conversationId={conversationId} />
      ) : (
        <ImageGenLandingView />
      )}
    </BasePage>
  );
};

export default ImageGenPage;

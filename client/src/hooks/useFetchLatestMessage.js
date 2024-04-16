import { useContext, useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/services";
import { ChatContext } from "../context/ChatContext";

export const useFetchLatestMessage = (chat) => {
  const { newMessage } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

      if (response.error) {
        return console.log(response.error);
      }

      const latestMessageResponse = response[response?.length - 1];
      setLatestMessage(latestMessageResponse);
    };

    getMessages();
  }, [newMessage]);
  return { latestMessage };
};

import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/services";

export const useFetchLatestMessage = (chat) => {
  const [latestMessage, setLatestMessage] = useState(null);
  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

      if (response.error) {
        return console.log(response.error);
      }

      const latestMessage = response[response?.length - 1];
      setLatestMessage(latestMessage);
    };

    getMessages();
  }, []);
  return { latestMessage };
};

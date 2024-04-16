import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/services";

export const useFetchRecipients = (chat, user) => {
  const [recipientUsers, setRecipientUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const recipientsId = chat?.members.filter((id) => id !== user?._id);
    // console.log("recipientsId", recipientsId);

    const getUsers = async () => {
      setLoading(true); // Set loading to true before fetching data

      if (recipientsId?.length < 1) {
        setLoading(false); // Set loading to false if no recipients
        return null;
      }

      const userPromises = recipientsId?.map(async (id) => {
        const user = await getRequest(`${baseUrl}/users/find/${id}`);
        // console.log("user", user);
        return user;
      });

      if (userPromises) {
        const resolvedUsers = await Promise.all(userPromises);
        //   console.log("resolvedUsers", resolvedUsers);
        setRecipientUsers(resolvedUsers);
        setLoading(false); // Set loading to false after fetching data
      }
    };

    getUsers();
  }, [chat, user]);

  return { recipientUsers, loading };
};

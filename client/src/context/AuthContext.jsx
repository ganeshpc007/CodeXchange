import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest, baseUrl } from "../utils/services.js";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [isSignUpLoding, setIsSignUpLoding] = useState(false);
  const [signInError, setSignInError] = useState(null);
  const [isSignInLoading, setIsSignInLoading] = useState(null);
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signInInfo, setSignInInfo] = useState({
    password: "",
    email: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  const updateSignUpInfo = useCallback((info) => {
    setSignUpInfo(info);
  }, []);

  const updateSignInInfo = useCallback((info) => {
    setSignInInfo(info);
  }, []);

  // console.log("signUpInfo", signUpInfo);
  // console.log("signUpError", signUpError);

  const signUpUser = useCallback(
    async (e) => {
      console.log("signUpUser called");
      e.preventDefault();

      setIsSignUpLoding(true);
      setSignUpError(null);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        signUpInfo
      );

      setIsSignUpLoding(false);

      if (response.error) {
        return setSignUpError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [signUpInfo]
  );

  const signInUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsSignInLoading(true);
      setSignInError(null);

      const response = await postRequest(`${baseUrl}/users/login`, signInInfo);

      setIsSignInLoading(false);

      if (response.error) {
        return setSignInError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [signInInfo]
  );

  const siginOut = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUpError,
        isSignUpLoding,
        signInError,
        signUpInfo,
        signInInfo,
        isSignInLoading,
        updateSignUpInfo,
        updateSignInInfo,
        signUpUser,
        signInUser,
        siginOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

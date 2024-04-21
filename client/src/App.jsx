import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, React, lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen.jsx";

const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Chat = lazy(() => import("./pages/Chat"));

import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

const App = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserChange = async () => {
      if (user) {
        navigate("/chat");
      }
    };

    handleUserChange();
  }, [user, navigate]);

  return (
    <ChatContextProvider user={user}>
      <div>
        <Routes>
          <Route
            path="/chat"
            element={
              user ? (
                <Suspense fallback={<LoadingScreen />}>
                  <Chat />
                </Suspense>
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/signin"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </ChatContextProvider>
  );
};

export default App;

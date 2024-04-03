import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Chat from "./pages/Chat";
import Container from "@mui/material/Container";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
const App = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  return (
    <ChatContextProvider user={user}>
      <div>
        <Routes>
          <Route
            path="/chat"
            element={user ? <Chat /> : <Navigate to="/signin" />}
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </ChatContextProvider>
  );
};

export default App;

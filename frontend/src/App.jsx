import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./Firebase.jsx"; // Import Firebase auth
import Home from "./components/Home/Home";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import RoomPage from "./components/RoomPage/RoomPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import "./App.css";

const App = () => {
  const [isAuthChecked, setIsAuthChecked] = useState(false); // Track if Firebase auth state is loaded

  useEffect(() => {
    // Wait for Firebase to initialize and check the auth state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthChecked(true); // Set auth state as checked
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (!isAuthChecked) {
    return <div>Loading...</div>; // Show a loading state while Firebase initializes
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/join"
          element={
            <ProtectedRoute>
              <JoinRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <ProtectedRoute>
              <RoomPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
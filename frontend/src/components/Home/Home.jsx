import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider, signInWithPopup } from "../../Firebase"; // Import Firebase auth
import Navbar from "../Navbar/Navbar";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleJoinClick = async () => {
    if (auth.currentUser) {
      navigate("/join"); // Redirect to join route if logged in
    } else {
      try {
        await signInWithPopup(auth, googleAuthProvider); // Redirect to login if not logged in
        navigate("/join");
      } catch (error) {
        console.error("Error signing in with Google:", error);
      }
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1>Welcome to Pair Pro</h1>
        <p>Collaborate on code in real-time with your team.</p>
        <p className="subtext">
          Join rooms, share code, and work together seamlessly. Whether you're
          debugging, brainstorming, or pair programming, CodeCollab makes it
          easy.
        </p>
        <button onClick={handleJoinClick} className="join-button">
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook
import Navbar from "../Navbar/Navbar";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0(); // Auth0 authentication state

  const handleJoinClick = () => {
    if (isAuthenticated) {
      navigate("/join"); // Redirect to join route if logged in
    } else {
      loginWithRedirect(); // Redirect to login if not logged in
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1>Welcome to CodeCollab</h1>
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
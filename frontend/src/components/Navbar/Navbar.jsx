import { Link } from "react-router-dom";
import { auth, googleAuthProvider, signInWithPopup, signOut } from "../../firebase"; // Import Firebase auth
import { useEffect, useState } from "react"; // Import useEffect and useState
import "./Navbar.css";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"; // Import icons

const Navbar = () => {
  const [user, setUser] = useState(auth.currentUser); // Track the user state

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Update the user state
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
           Pair Pro
        </Link>

        <div className="navbar-right">
          {user ? (
            <div className="user-info">
              <FaUser className="user-icon" /> {/* User icon */}
              <span className="username">{user.displayName}</span> {/* Display username */}
              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                <FaSignOutAlt className="icon" /> Log Out {/* Logout icon */}
              </button>
            </div>
          ) : (
            <button onClick={() => signInWithPopup(auth, googleAuthProvider)} className="login-btn">
              <FaSignInAlt className="icon" /> Log In {/* Login icon */}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
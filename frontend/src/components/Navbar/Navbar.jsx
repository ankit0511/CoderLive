import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"; // Import icons

const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated,  } = useAuth0();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
           Pair Pro
        </Link>

        <div className="navbar-right">
          {isAuthenticated ? (
            <div className="user-info">
              <FaUser className="user-icon" /> {/* User icon */}
              <span className="username">{user.name}</span> {/* Display username */}
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="logout-btn"
              >
                <FaSignOutAlt className="icon" /> Log Out {/* Logout icon */}
              </button>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()} className="login-btn">
              <FaSignInAlt className="icon" /> Log In {/* Login icon */}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
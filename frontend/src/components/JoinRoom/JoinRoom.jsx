import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook
import Navbar from "../Navbar/Navbar";
import "./JoinRoom.css";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [activeSection, setActiveSection] = useState("create"); // Tracks active section
  const [showEmailModal, setShowEmailModal] = useState(false); // Tracks email modal visibility
  const [email, setEmail] = useState(""); // Stores the email address
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0(); // Get user info from Auth0

  // Set the username to the authenticated user's name
  useEffect(() => {
    if (isAuthenticated && user) {
      setUserName(user.name || user.nickname || user.email || "");
    }
  }, [isAuthenticated, user]);

  // Generate a 32-character room ID
  const generateRoomId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 26; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRoomId(result);
  };

  // Copy room ID to clipboard
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      alert("Room ID copied to clipboard!");
    });
  };

  // Handle sending invite via email
  const sendInviteEmail = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/send-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          roomId,
          subject: "Invitation for Interview",
          message: `You have been invited to join a CodeCollab room. Use the following Room ID to join: ${roomId}`,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send the invitation email.");
      }
  
      alert("Invitation email sent successfully!");
      setShowEmailModal(false); // Close the modal
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email. Please try again.");
    }
  };
  
  // Handle joining a room
  const handleJoinRoom = () => {
    if (roomId && userName) {
      navigate(`/room/${roomId}`, { state: { userName } });
    }
  };

  return (
    <div className="join-room-container">
      <Navbar />
      <div className="join-room-content">
        <div className="left-section">
          <h1>Welcome to CodeCollab</h1>
          <div className="dynamic-text">
            <span>You can code in </span>
            <div className="language-list">
              <span>JavaScript</span>
              <span>PHP</span>
              <span>Java</span>
              <span>C++</span>
              <span>Python</span>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="section-toggle">
            <button
              className={activeSection === "create" ? "active" : ""}
              onClick={() => setActiveSection("create")}
            >
              Create Room
            </button>
            <button
              className={activeSection === "join" ? "active" : ""}
              onClick={() => setActiveSection("join")}
            >
              Join Room
            </button>
          </div>

          {/* Create Room Section */}
          {activeSection === "create" && (
            <div className="create-room-form">
              <h2>Create a New Room</h2>
              <div className="room-id-section">
                <input
                  type="text"
                  placeholder="Room ID"
                  value={roomId}
                  readOnly // Room ID is auto-generated and read-only
                />
                <span onClick={generateRoomId} className="generate-room-id-text">
                  Generate Room ID
                </span>
              </div>
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button onClick={handleJoinRoom}>Join Room</button>
              <button
                onClick={() => setShowEmailModal(true)}
                className="invite-button"
              >
                Invite User
              </button>
            </div>
          )}

          {/* Join Room Section */}
          {activeSection === "join" && (
            <div className="join-room-form">
              <h2>Join a Room</h2>
              <input
                type="text"
                placeholder="Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button onClick={handleJoinRoom}>Join Room</button>
            </div>
          )}
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="email-modal">
          <div className="email-modal-content">
            <h3>Send Invite via Email</h3>
            <input
              type="email"
              placeholder="Enter recipient's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="email-modal-buttons">
              <button onClick={copyRoomId}>Copy Room ID</button>
              <button onClick={sendInviteEmail}>Send Invite</button>
              <button onClick={() => setShowEmailModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinRoom;
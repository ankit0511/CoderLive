import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../UserList/UserList";
import "./Sidebar.css";

const Sidebar = ({ roomId, userName, leaveRoom, users }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Toggle sidebar visibility
  const navigate = useNavigate();

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Handle leaving the room
  const handleLeaveRoom = () => {
    leaveRoom(); // Call the leaveRoom function
    navigate("/join"); // Redirect to the JoinRoom page
  };

  // Copy invitation link to clipboard
  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("Invitation link copied to clipboard!");
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <button className="toggle-sidebar-button" onClick={toggleSidebar}>
        {isSidebarVisible ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}>
        

        {/* User List */}
        <UserList users={users} />

        {/* Invite and Leave Buttons */}
        <div className="sidebar-buttons">
          <button className="invite-button" onClick={copyInviteLink}>
            Invite User
          </button>
          <button className="leave-button" onClick={handleLeaveRoom}>
            Leave 
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
import React from "react";
import "./UserList.css";

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      <h3>Online Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <img
              src={`https://i.pravatar.cc/30?img=${index}`} 
              alt={user}
            />
            <span>{user}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
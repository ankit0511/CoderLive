
  **CodeCollab - Real-Time Collaborative Code Editor**

![CodeCollab Screenshot](./screenshot.png) <!-- Add a screenshot if available -->

**CodeCollab** is a real-time collaborative code editor that allows multiple users to write, edit, and execute code together in a shared environment. It supports multiple programming languages, real-time code synchronization, and live output display. Built with **React**, **Socket.IO**, and **Auth0**, this project is perfect for pair programming, coding interviews, or collaborative learning.

---

## **Features**

- **Real-Time Collaboration**: Multiple users can join a room and edit code simultaneously.
- **Code Execution**: Execute code in real-time using the **Piston API** and see the output instantly.
- **Language Support**: Choose from a wide range of programming languages and their latest versions.
- **User Authentication**: Secure login and user management powered by **Auth0**.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Resizable Panels**: Adjust the width of the editor and output sections for a customized workspace.
- **Sidebar**: View all active users in the room and manage your session.

---

## **Technologies Used**

- **Frontend**: React, React Router, Socket.IO Client
- **Backend**: Node.js, Express, Socket.IO
- **Authentication**: Auth0
- **Code Execution**: [Piston API](https://emkc.org/api/v2/piston/)
- **Styling**: CSS (with responsive design)
- **Version Control**: Git

---

## **Getting Started**

Follow these steps to set up and run the project locally.

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn
- Auth0 account (for authentication)

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/codecollab.git
   cd codecollab

npm install
# or
yarn install

Set up Auth0:

Create an Auth0 application and configure the following:

Allowed Callback URLs: http://localhost:3000

Allowed Logout URLs: http://localhost:3000

Allowed Web Origins: http://localhost:3000


.env Files 
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_AUTH0_REDIRECT_URI=http://localhost:3000

npm start
# or
yarn start

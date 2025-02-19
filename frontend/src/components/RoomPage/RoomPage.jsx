import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { auth, googleAuthProvider, signInWithPopup } from "../../Firebase"; // Import Firebase auth
import Sidebar from "../Sidebar/Sidebar";
import Editor from "../Editor/Editor";
import socket from "../../utils/socket";
import "./RoomPage.css";
import axios from "axios"; // Import axios for making API requests

const RoomPage = () => {
  const { roomId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const userName = state?.userName || "Anonymous";

  const [language, setLanguage] = useState("javascript"); // Default language
  const [code, setCode] = useState("// start code here");
  const [output, setOutput] = useState(""); // State to store the output
  const [users, setUsers] = useState([]); // State to store the list of users
  const [languages, setLanguages] = useState([]); // State to store supported languages
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state
  const [editorWidth, setEditorWidth] = useState("70%"); // Default editor width

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!auth.currentUser) {
      signInWithPopup(auth, googleAuthProvider)
        .then(() => {
          navigate(`/join`, { state: { userName: auth.currentUser.displayName } });
        })
        .catch((error) => {
          console.error("Error signing in with Google:", error);
        });
    }
  }, [navigate]);

  // Fetch supported languages from the Piston API
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get("https://emkc.org/api/v2/piston/runtimes");
        const runtimes = response.data;

        // Extract unique languages and their latest versions
        const uniqueLanguages = {};
        runtimes.forEach((runtime) => {
          if (!uniqueLanguages[runtime.language] || runtime.version > uniqueLanguages[runtime.language].version) {
            uniqueLanguages[runtime.language] = {
              version: runtime.version,
              aliases: runtime.aliases,
            };
          }
        });

        // Convert to an array for the dropdown
        const languagesArray = Object.keys(uniqueLanguages).map((language) => ({
          name: language,
          version: uniqueLanguages[language].version,
        }));

        setLanguages(languagesArray);
      } catch (error) {
        console.error("Failed to fetch supported languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    // Join the room
    socket.emit("join", { roomId, userName });

    // Listen for user list updates
    socket.on("userJoined", (updatedUsers) => {
      console.log("user joined in frontend");
      console.log("users", updatedUsers);
      setUsers(updatedUsers);
    });

    // Listen for code updates
    socket.on("codeUpdate", (newCode) => {
      console.log("code get updated", newCode);
      setCode(newCode);
    });

    // Listen for output updates
    socket.on("outputUpdate", (newOutput) => {
      console.log("Received output update:", newOutput);
      setOutput(newOutput);
    });

    // Cleanup on unmount
    return () => {
      socket.off("userJoined");
      socket.off("codeUpdate");
      socket.off("outputUpdate");
      socket.emit("leaveRoom");
    };
  }, [roomId, userName]);

  // Handle language changes
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage); // Update the selected language
    socket.emit("languageChange", { roomId, language: newLanguage }); // Broadcast the language change
  };

  // Handle code changes in the editor
  const handleCodeChange = (newCode) => {
    console.log("code changes locally", newCode);
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
  };

  // Handle leaving the room
  const leaveRoom = () => {
    socket.emit("leaveRoom");
    window.location.href = "/";
  };

  // Execute code using the Piston API
  const executeCode = async () => {
    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language, // Selected language
        version: "*", // Use the latest version
        files: [
          {
            content: code, // Current code from the editor
          },
        ],
      });

      const output = response.data.run.output;
      setOutput(output); // Update the output state
      socket.emit("outputUpdate", { roomId, output }); // Broadcast the output to the room
    } catch (error) {
      console.error("Code execution error:", error);
      setOutput("Failed to execute code");
    }
  };

  // Handle resizing the editor and output sections
  const handleResize = (e) => {
    const containerWidth = e.currentTarget.parentElement.offsetWidth;
    const newWidth = ((e.clientX - e.currentTarget.parentElement.offsetLeft) / containerWidth) * 100;
    setEditorWidth(`${newWidth}%`);
  };

  return (
    <div className="room-page-container">
      <Sidebar
        roomId={roomId}
        userName={userName}
        leaveRoom={leaveRoom}
        users={users}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`editor-output-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div
          className="editor-section"
          style={{ width: editorWidth }}
        >
          <div className="editor-header">
            <select
              className="language-dropdown"
              value={language}
              onChange={handleLanguageChange}
            >
              {languages.map((lang) => (
                <option key={lang.name} value={lang.name}>
                  {lang.name} ({lang.version})
                </option>
              ))}
            </select>
            <button className="run-button" onClick={executeCode}>
              Run Code
            </button>
          </div>
          <Editor language={language} code={code} onCodeChange={handleCodeChange} />
        </div>
        <div
          className="resize-handle"
          onMouseDown={(e) => {
            document.addEventListener("mousemove", handleResize);
            document.addEventListener("mouseup", () => {
              document.removeEventListener("mousemove", handleResize);
            });
          }}
        />
        <div
          className="output-section"
          style={{ width: `calc(100% - ${editorWidth})` }}
        >
          <h3>Output</h3>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
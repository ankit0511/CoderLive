import { useRef } from "react";
import Editor from "@monaco-editor/react";
import "./Editor.css";

const CodeEditor = ({ language, code, onCodeChange }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <Editor
      height="90vh"
      defaultLanguage={language}
      language={language}
      value={code}
      onChange={onCodeChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
      }}
      onMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
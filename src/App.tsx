import { EditorProvider } from "./components/Context";
import Tiptap from "./components/Tiptap";
import "./App.css";

function App() {
  return (
    <EditorProvider>
      <Tiptap />
    </EditorProvider>
  );
}

export default App;

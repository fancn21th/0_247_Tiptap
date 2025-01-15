import "./styles.scss";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

export default () => {
  const editor = useEditor({
    content: "# Title",
    extensions: [StarterKit, Markdown],
  });

  return (
    <>
      <EditorContent editor={editor} />
      <button onClick={() => editor.commands.setContent("# hi")}>hi</button>
    </>
  );
};

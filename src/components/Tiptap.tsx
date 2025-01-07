/* eslint-disable react-refresh/only-export-components */
import "./styles.scss";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Notice } from "./Notice";

export default () => {
  const editor = useEditor({
    extensions: [StarterKit, Notice],
    content: `
      <div class="notice">
        This is a notice
      </div>
    `,
  });

  return <EditorContent editor={editor} />;
};

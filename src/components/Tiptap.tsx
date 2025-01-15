import "./styles.scss";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

const markdown = `
# Title
## Subtitle
`;

export default () => {
  const editor = useEditor({
    content: "# Title",
    extensions: [StarterKit, Markdown],
  });

  let index = 0;

  const writeMarkdown = () => {
    const t = setInterval(() => {
      if (index < markdown.length) {
        editor.commands.setContent(markdown.slice(0, index++));
      } else clearInterval(t);
    }, 10);
  };

  return (
    <>
      <EditorContent editor={editor} />
      <button onClick={writeMarkdown}>hi</button>
    </>
  );
};

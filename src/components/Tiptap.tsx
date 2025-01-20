import "./styles.scss";
import { BubbleMenu, EditorContent } from "@tiptap/react";
import { useContext, useEffect, useState } from "react";
import { EditorContext } from "./Context";

const TiptapComponent = () => {
  const { editor, selectionRange } = useContext(EditorContext);
  const [isEditable, setIsEditable] = useState(true);

  // 控制编辑器的可编辑性
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  // 监听编辑器的 blur 事件，并输出选区范围
  useEffect(() => {
    if (!editor) return;

    const handleBlur = () => {
      console.log("选区范围:", selectionRange);
      if (selectionRange) {
        setTimeout(() => {
          editor.commands.focus(); // 重新聚焦编辑器
          editor.commands.setTextSelection(selectionRange); // 恢复选区
        }, 50);
      }
    };

    editor.on("blur", handleBlur);

    return () => {
      editor.off("blur", handleBlur);
    };
  }, [editor, selectionRange]);

  return (
    <>
      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={isEditable}
            onChange={() => setIsEditable(!isEditable)}
          />
          Editable
        </label>
      </div>

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              Strike
            </button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};

export default TiptapComponent;

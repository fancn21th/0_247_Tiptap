import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createContext, ReactNode, useEffect, useState } from "react";

export type Range = {
  from: number;
  to: number;
};

export type EditorContextType = {
  editor: ReturnType<typeof useEditor> | null;
  selectionRange: Range | null;
};

export const EditorContext = createContext<EditorContextType>(
  {} as EditorContextType
);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);

  // 初始化 Tiptap 编辑器
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
        <p>
          Hey, try to select some text here. There will popup a menu for selecting some inline styles.
        </p>
      `,
  });

  // 监听编辑器的选区变化
  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      const { from, to } = editor.state.selection;
      if (from !== to) {
        setSelectionRange({ from, to });
      } else {
        setSelectionRange(null); // 如果未选中文本，则清空选区
      }
    };

    // 监听选区更新事件
    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate); // 清理事件
    };
  }, [editor]);

  return (
    <EditorContext.Provider value={{ editor, selectionRange }}>
      {children}
    </EditorContext.Provider>
  );
};

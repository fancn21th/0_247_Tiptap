import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createContext, ReactNode, useEffect, useState } from "react";

export type Range = {
  from: number;
  to: number;
};

export type EditorContextType = {
  editor: ReturnType<typeof useEditor>;
  selectionRange: Range | null;
};

export const EditorContext = createContext<EditorContextType>(
  {} as EditorContextType
);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: `
        <p>
          Hey, try to select some text here. There will popup a menu for selecting some inline styles. Remember: you have full control about content and styling of this menu.
        </p>
      `,
  });

  useEffect(() => {
    if (editor) {
      const { from, to } = editor.state.selection;
      if (from !== to) {
        setSelectionRange({ from, to });
      }
    }
  }, [editor.state.selection]);

  useEffect(() => {
    console.log("selectionRange", selectionRange);
  }, [selectionRange]);

  return (
    <EditorContext.Provider value={{ editor, selectionRange }}>
      {children}
    </EditorContext.Provider>
  );
};

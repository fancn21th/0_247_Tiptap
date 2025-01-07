import { Node, mergeAttributes } from "@tiptap/core";

export const Notice = Node.create({
  name: "notice",

  group: "block", // 允许作为块级元素
  content: "inline*", // 内部可以包含内联内容

  addOptions() {
    return {
      HTMLAttributes: {
        class: "notice",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.notice",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setNotice:
        () =>
        ({ commands }) => {
          return commands.insertContent(
            '<div class="notice">This is a notice</div>'
          );
        },
    };
  },
});

import React, { useCallback, useMemo, useState, forwardRef } from "react";
import { createEditor, Descendant, Editor as BaseEditor, Text as BaseText } from "slate";
import { Slate, Editable, withReact, ReactEditor, RenderLeafProps as BaseRenderLeafProps } from "slate-react";

interface LinkedInPostCreationProps {
  onPostSubmit: (content: Descendant[]) => void;
  value?: Descendant[];
}

type ParagraphElement = {
  type: "paragraph";
  children: { text: string }[];
};

interface Editor extends BaseEditor, ReactEditor {
  isActive: (format: string) => boolean;
  chain: () => any;
}

interface Text extends BaseText {
  bold?: boolean;
  link?: string;
}

interface RenderLeafProps extends BaseRenderLeafProps {
  leaf: Text;
}

const createParagraph = (text: string): ParagraphElement => ({
  type: "paragraph",
  children: [{ text }],
});

const TextareaWithRef = forwardRef<HTMLDivElement, any>((props, ref) => (
  <Editable ref={ref} {...props} />
));

const LinkedInPostCreation: React.FC<LinkedInPostCreationProps> = ({
  onPostSubmit,
  value: initialValue,
}) => {
  const editor = useMemo(() => withReact(createEditor()) as Editor, []);
  const [value, setValue] = useState<Descendant[]>(initialValue || [createParagraph("")]);

  const toggleLinkMark = (url: string) => {
    editor.chain().focus().wrapLink(url).run();
  };

  const renderLeaf = useCallback(({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.bold) {
      return <strong {...attributes}>{children}</strong>;
    }
    if (leaf.link) {
      return (
        <a href={leaf.link} {...attributes}>
          {children}
        </a>
      );
    }

    return <span {...attributes}>{children}</span>;
  }, []);

  const handleSubmit = () => {
    onPostSubmit(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <TextareaWithRef
          renderLeaf={renderLeaf}
          className="text-sm bg-transparent p-2 rounded resize-none overflow-hidden"
          placeholder="Write your post here..."
          style={{
            minHeight: "100px",
            maxHeight: "200px",
            lineHeight: "1.5",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
        />
        <div className="mt-2 flex justify-between items-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </Slate>
    </div>
  );
};

export default LinkedInPostCreation;

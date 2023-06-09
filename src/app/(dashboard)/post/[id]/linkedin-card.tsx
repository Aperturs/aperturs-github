// LinkedInPostCreation.tsx
import React, { useMemo, useState, useRef, useEffect, forwardRef } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

  

interface LinkedInPostCreationProps {
  onPostSubmit: (content: Descendant[]) => void;
  value?: Descendant[];
}

type ParagraphElement = {
  type: "paragraph";
  children: { text: string }[];
};

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
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue || [createParagraph("")]);
  
  

  const editableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleInput = () => {
        if (editableRef.current) {
          const { selection } = editor;
          const lines = editableRef.current.innerText.split("\n");
          if (lines.length >= 7) {
            lines.splice(4, 2, "-----> show more");
            editableRef.current.innerText = lines.join("\n");
            if (selection) {
              editor.selection = selection;
            }
          }
        }
      };
      
    if (editableRef.current) {
      editableRef.current.addEventListener("input", handleInput);
    }

    return () => {
      if (editableRef.current) {
        editableRef.current.removeEventListener("input", handleInput);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <TextareaWithRef
          className="text-sm bg-transparent p-2 rounded resize-none overflow-hidden"
          placeholder="Write your post here..."
          style={{
            minHeight: "100px",
            maxHeight: "600px",
            lineHeight: "1.5",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
        />
        <div className="mt-2 flex justify-between items-center">
          <div className="flex space-x-2">
            {/* Add your icons here */}
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => onPostSubmit(value)}
          >
            Post
          </button>
        </div>
      </Slate>
    </div>
  );
};

export default LinkedInPostCreation;

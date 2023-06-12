// LinkedInPostCreation.tsx
import React, { useState } from 'react';

interface LinkedInPostCreationProps {
  onSubmit: (content: string) => void;
  intialContent?: string;
}

const LinkedInPostCreation: React.FC<LinkedInPostCreationProps> = ({ onSubmit,intialContent }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };

  return (
    <div className="w-full   relative">
      <textarea
        className="w-full border min-h-[300px] max-h-[500px] resize-none border-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline-none focus:outline-none"
        defaultValue={intialContent || ''}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && content.trim() !== '') {
            handleSubmit(e);
          }
        }}
        placeholder="What do you want to talk about?"
        onBlur={() => setContent('')}
      />
    </div>
  );
};

export default LinkedInPostCreation;

'use client'

import { useState } from 'react';

type Question = {
  question: string;
  description: string;
};

export default function QuestionCard({ question, description }: Question) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(answer);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-medium mb-2">{question}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="answer" className="block mb-2 font-medium">Answer:</label>
        <textarea
          id="answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
}

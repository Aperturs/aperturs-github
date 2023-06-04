import React from 'react'
import QuestionCard from './question';




const questions = [
  {
    question: 'What inspired you to start this project?',
    description: 'We want to know what motivated you to create this project. Is there a story behind it? Did you identify a problem that needed to be solved? Share your inspiration and what led you to start this project.',
  },
  {
    question: 'What are some of the key challenges you faced while developing this project?',
    description: 'We understand that developing a project can come with its own set of challenges. We want to know what specific challenges you faced while developing this project. Did you encounter any technical issues? How did you overcome them?',
  },
  {
    question: 'What are some of the unique features of this project?',
    description: 'We want to know what sets your project apart from others. What are some of the unique features that you have included? What makes your project stand out?',
  },
  {
    question: 'Who do you see as the primary users of this project?',
    description: 'We want to know who your project is intended for. Who are the primary users? What needs does your project solve for them?',
  },
  {
    question: 'What was your process for testing and quality assurance?',
    description: 'We want to know how you ensured your project was of high quality. What was your testing process like? What tools did you use to ensure quality?',
  },
  {
    question: 'What was your biggest learning experience while working on this project?',
    description: 'We want to know what you learned while working on this project. Did you learn any new skills? Did you encounter any surprises? Share your biggest learning experience.',
  },
  {
    question: 'What was your deployment strategy for this project?',
    description: 'We want to know how you deployed your project. What was your strategy like? Did you use any specific tools or services?',
  },
  {
    question: 'What are some of the risks associated with this project, and how did you mitigate them?',
    description: 'We want to know what risks you identified while working on this project. How did you mitigate them? What steps did you take to ensure the success of the project?',
  },
  {
    question: 'What is your vision for the future of this project?',
    description: 'We want to know what your plans are for the future of this project. Do you plan to add more features? Are there any improvements you would like to make?',
  },
  {
    question: 'What was the most exciting part of working on this project for you?',
    description: 'We want to know what you enjoyed the most while working on this project. Was there a specific feature or aspect that you found particularly exciting? Share your experience with us.',
  },
];

const ProjectContext = () => {
  return (
    <div className="container mx-auto py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {questions.map((q) => (
        <QuestionCard key={q.question} question={q.question} description={q.description} />
      ))}
    </div>
  </div>
  )
}

export default ProjectContext

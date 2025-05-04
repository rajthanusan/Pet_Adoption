import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    text: "How active are you?",
    options: [
      { text: "Very active", value: "active" },
      { text: "Moderately active", value: "moderate" },
      { text: "Not very active", value: "calm" }
    ]
  },
  {
    id: 2,
    text: "Do you prefer indoor or outdoor activities?",
    options: [
      { text: "Mostly indoor", value: "indoor" },
      { text: "Mix of both", value: "both" },
      { text: "Mostly outdoor", value: "outdoor" }
    ]
  },
  {
    id: 3,
    text: "How much time can you spend with a pet daily?",
    options: [
      { text: "Less than 1 hour", value: "low" },
      { text: "1-3 hours", value: "medium" },
      { text: "More than 3 hours", value: "high" }
    ]
  }
];

const PersonalityQuiz = ({ pets, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateResult(answers);
      onComplete(result);
    }
  };

  const calculateResult = (answers) => {
    if (answers[1] === 'active') {
      return pets.filter(pet => pet.personality.toLowerCase().includes('playful') || pet.personality.toLowerCase().includes('energetic'));
    } else if (answers[1] === 'calm') {
      return pets.filter(pet => pet.personality.toLowerCase().includes('calm') || pet.personality.toLowerCase().includes('shy'));
    }
    return pets;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Pet Personality Quiz</h2>
      {currentQuestion < questions.length ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion].text}</h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-4">Quiz Completed!</h3>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            View Recommended Pets
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalityQuiz;
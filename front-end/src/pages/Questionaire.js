import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Questionare = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      question: "Which city are you in?",
      options: ["New York"],
    },
    {
      question: "How long would you like to run for",
      options: ["1 Mile", "2 Miles", "5 Miles"],
    },
    {
      question: "What would you like to see?",
      options: ["Park", "Meusem", "Historical Building"],
    },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (e) => {
    // console.log(e.target.value);
    // console.log(questions[currentQuestion]);
    // if (e.target.value === questions[currentQuestion].correct) {
    //   setScore(score + 1);
    // }
    setAnswers((prev) => [...prev, e.target.value]);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion + 1 === questions.length) {
      if (answers.includes("2 Miles") && answers.includes("Park")) {
        navigate("/PopularRunCentralPark");
      } else {
        alert("No route found");
      }
    }
  };
  return (
    <div>
      <h2>{questions[currentQuestion].question}</h2>
      <select onInput={(e) => handleAnswer(e)}>
        <option defaultValue="selected" defaultChecked>
          Please select
        </option>
        {questions[currentQuestion].options.map((option, key) => {
          return (
            <option key={key} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Questionare;

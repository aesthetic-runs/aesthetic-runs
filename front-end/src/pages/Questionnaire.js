import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
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
      options: ["Park", "Museum", "Historical Building"],
    },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (e) => {
    console.log(e.target.value);
    // console.log(questions[currentQuestion]);
    // if (e.target.value === questions[currentQuestion].correct) {
    //   setScore(score + 1);
    // }
    if (e.target.value !== "Please select") {
      setAnswers([...answers, e.target.value]);
    }

    if (currentQuestion + 1 < questions.length) {
      // making the next question appear and selecting the the first option
      setCurrentQuestion(currentQuestion + 1);
      e.target.selectedIndex = 0;
    }
  };

  useEffect(() => {
    console.log(answers);
    if (
      answers.length === 3 &&
      answers.includes("1 Mile") &&
      answers.includes("Park")
    ) {
      navigate("/PopularRunHudsonRiver");
    } else if (
      answers.length === 3 &&
      answers.includes("1 Mile") &&
      answers.includes("Historical Building")
    ) {
      navigate("/QuickRunLincolnCenter");
    } else if (
      answers.length === 3 &&
      answers.includes("2 Miles") &&
      answers.includes("Museum")
    ) {
      navigate("/PopularRunMidtownEastArchitecture");
    } else if (
      answers.length === 3 &&
      answers.includes("2 Miles") &&
      answers.includes("Historical Building")
    ) {
      navigate("/QuickRunEmpireState");
    } else if (
      answers.length === 3 &&
      answers.includes("5 Miles") &&
      answers.includes("Historical Building")
    ) {
      navigate("/QuickRunStatueLiberty");
    } else if (
      answers.length === 3 &&
      answers.includes("5 Miles") &&
      answers.includes("Park")
    ) {
      navigate("/PopularRunCentralPark");
    }
  }, [answers]);

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

export default Questionnaire;

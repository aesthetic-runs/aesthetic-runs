import { useEffect, useState } from "react";
import "../styles/Questionaire.css";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [questions] = useState([
    {
      question: "Which city are you in?",
      options: ["New York"],
    },
    {
      question: "How far would you like to run?",
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
    // console.log(e.target.value);

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
    // console.log(answers);
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
    if (
      (answers.length === 3 &&
        answers.includes("1 Mile") &&
        answers.includes("Museum")) ||
      (answers.length === 3 &&
        answers.includes("2 Miles") &&
        answers.includes("Park")) ||
      (answers.length === 3 &&
        answers.includes("5 Miles") &&
        answers.includes("Museum"))
    ) {
      alert("No Route Available");
      navigate("/Home");
    }
  }, [answers]);

  const goToPrevious = (e) => {
    if (currentQuestion === 0) {
      setCurrentQuestion(0);
    } else {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  return (
    <div className="question-wrapper">
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
      <button className="back-btn" onClick={goToPrevious}>
        Back
      </button>
    </div>
  );
};

export default Questionnaire;

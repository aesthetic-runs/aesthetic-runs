import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "../styles/Questionaire.css";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
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
  });

  const goToPrevious = (e) => {
    if (currentQuestion === 0) {
      setCurrentQuestion(0);
    } else if (currentQuestion === 1) {
      window.location.reload(false);
    } else {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  return (
    <div className="question-wrapper">
      <Typography
        variant="h2"
        align="center"
        color="text.primary"
        sx={{ fontWeight: "bold" }}
      >
        {questions[currentQuestion].question}
      </Typography>
      <FormControl
        sx={{ m: 1, minWidth: 160, marginTop: "2vh", marginBottom: "2vh" }}
        size="small"
      >
        <InputLabel>Please select</InputLabel>
        <Select label="Please select" onChange={(e) => handleAnswer(e)}>
          {questions[currentQuestion].options.map((option, key) => {
            return (
              <MenuItem key={key} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button onClick={goToPrevious} variant="contained">
        Back
      </Button>
    </div>
  );
};

export default Questionnaire;

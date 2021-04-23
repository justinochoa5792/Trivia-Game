import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

const App = () => {
  const [trivia, setTrivia] = useState([]);

  const getQuestions = async () => {
    const response = await Axios.get("https://opentdb.com/api.php?amount=15");
    console.log(response.data);
    setTrivia(response.data.results);
  };
  const renderTrivia = () => {
    return trivia.map((triv) => {
      return (
        <ul>
          <li>{triv.category}</li>
          <li dangerouslySetInnerHTML={{ __html: triv.question }}></li>
          <li>A:{triv.incorrect_answers[0]}</li>{" "}
          <li>B:{triv.incorrect_answers[1]}</li>
          <li>C:{triv.correct_answer}</li>
          <li>D:{triv.incorrect_answers[2]}</li>
        </ul>
      );
    });
  };

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div className="App">
      <h1>Trivia</h1>
      {renderTrivia()}
    </div>
  );
};

export default App;

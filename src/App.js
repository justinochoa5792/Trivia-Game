import React, { useState, useEffect } from "react";
import Axios from "axios";
import FlashcardList from "./FlashcardList";
import "./App.css";

const App = () => {
  const [flashcards, setFlashCard] = useState([]);

  useEffect(() => {
    Axios.get("https://opentdb.com/api.php?amount=15").then((response) => {
      setFlashCard(
        response.data.results.map((flashcard, index) => {
          const answer = (
            <li
              dangerouslySetInnerHTML={{ __html: flashcard.correct_answer }}
            ></li>
          );
          const options = [...flashcard.incorrect_answers, answer];
          return {
            id: `${index}- ${Date.now()}`,
            question: (
              <li dangerouslySetInnerHTML={{ __html: flashcard.question }}></li>
            ),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  return (
    <div className="container">
      <h1>Trivia</h1>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
};

export default App;

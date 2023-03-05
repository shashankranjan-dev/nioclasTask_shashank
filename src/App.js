import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MathJax } from "better-react-mathjax";

const questions = [
  "AreaUnderTheCurve_901",
  "BinomialTheorem_901",
  "DifferentialCalculus2_901",
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${currentQuestion}`
      )
      .then((res) => {
        console.log(setProducts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentQuestion]);

  function handlePreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  function handleNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  return (
    <div>
      {products.map((product) => (
        <div className="content" key={product?.QuestionID}>
          {/*  the header part  start*/}
          <div className="header">
            <h1> {product.ChapterID}</h1>
          </div>

          {/*  timer difficulty level starts here*/}
          <div className="box">
            <h3 className="Category">Difficulty : {product.Difficulty}</h3>
            <h3 className="box2" style={{ color: "blue" }}>
              {" "}
              Expected Time : {product.ExpectedTime}
            </h3>
            <h3 className="box1"> Timer : {product.Step1Timer}</h3>
          </div>

          {/*  the question part  start*/}
          <p className="question">
            <MathJax>{product.Question}</MathJax>
          </p>
        </div>
      ))}
      {/* answer starts  */}

      <label class="container">
        None of these
        <input type="radio" name="radio" checked />
        <span class="check"></span>
      </label>
      <label class="container">
        All of these
        <input type="radio" name="radio" />
        <span class="check"></span>
      </label>
      <label class="container">
        Both
        <input type="radio" name="radio" />
        <span class="check"></span>
      </label>
      <label class="container">
        Option
        <input type="radio" name="radio" />
        <span class="check"></span>
      </label>

      <hr />
      {/*  the buttons part  start you can navigate between the questions*/}
      <div className="change">
        {currentQuestionIndex !== 0 && (
          <button className="btn1" onClick={handlePreviousQuestion}>
            {"<<"} Previous
          </button>
        )}
        {currentQuestionIndex !== questions.length - 1 && (
          <button className="btn2" onClick={handleNextQuestion}>
            Next {">>"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

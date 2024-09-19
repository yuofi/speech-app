"use client";

import React, { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import AudioRecorder from "../components/AudioRecorder";
import { burrinessCourse } from "../courses/burrinessCourse";

export default function Training() {
  const totalTasks = burrinessCourse.length;
  const totalPhrases = burrinessCourse.length;

  const [completedTasks, setCompletedTasks] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState(""); 

  // Cached window reference to avoid redundancy
  const windowAvailable = typeof window !== "undefined";

  // Load saved progress on mount
  useEffect(() => {
    if (windowAvailable) {
      const savedTasks = localStorage.getItem("completedTasks");
      const savedPhraseIndex = localStorage.getItem("currentPhraseIndex");

      // Handle potential errors by providing fallback
      setCompletedTasks(savedTasks ? parseInt(savedTasks) : 0);
      setCurrentPhraseIndex(savedPhraseIndex ? parseInt(savedPhraseIndex) : 0);
    }
  }, [windowAvailable]);

  // Handle next phrase
  const handleNextPhrase = () => {
    if (currentPhraseIndex < totalPhrases - 1) {
      const newPhraseIndex = currentPhraseIndex + 1;
      setCurrentPhraseIndex(newPhraseIndex);

      if (windowAvailable) {
        localStorage.setItem("currentPhraseIndex", newPhraseIndex);
      }
    }

    const newCompletedTasks = Math.min(completedTasks + 1, totalTasks);
    setCompletedTasks(newCompletedTasks);
    updateProgress(newCompletedTasks);
  };

  // Handle previous phrase
  const handlePrevPhrase = () => {
    if (currentPhraseIndex > 0) {
      const newPhraseIndex = currentPhraseIndex - 1;
      setCurrentPhraseIndex(newPhraseIndex);

      if (windowAvailable) {
        localStorage.setItem("currentPhraseIndex", newPhraseIndex);
      }
    }

    const newCompletedTasks = Math.max(completedTasks - 1, 0);
    setCompletedTasks(newCompletedTasks);
    updateProgress(newCompletedTasks);
  };

  // Update progress in localStorage
  const updateProgress = (newCompletedTasks) => {
    const progress = Math.floor((newCompletedTasks / totalTasks) * 100);
    if (windowAvailable) {
      localStorage.setItem("courseProgress", progress);
      localStorage.setItem("completedTasks", newCompletedTasks);
    }
  };

  // Handle feedback from AudioRecorder component
  const handleFeedbackUpdate = (response) => {
    if (response === 1) {
      setFeedbackMessage("Ваше произношение верно");
    } else if (response === 0) {
      setFeedbackMessage("Попробуйте еще раз");
    } else {
      setFeedbackMessage(""); 
    }
  };


  return (
    <div>
      <div className="HeaderContainer" style={trainingStyles.HeaderContainer}>
        <h1 className="HeaderText" style={trainingStyles.HeaderText}>
          Обучение
        </h1>
      </div>
      <div
        className="ProgressContainer"
        style={trainingStyles.ProgressContainer}
      >
        <ProgressBar
          progress={Math.floor(completedTasks * (100 / totalTasks))}
        />
        <p className="ProgressText" style={trainingStyles.ProgressText}>
          прогресс курса: {Math.floor(completedTasks * (100 / totalTasks))}%
        </p>
        <div className="ModelLogo" style={trainingStyles.ModelLogo}>
        <svg
            width="104.000031"
            height="163.000015"
            viewBox="0 0 104 163"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <desc>Created with Pixso.</desc>
            <defs />
            <rect
              id="фрейм 3"
              width="104.000000"
              height="163.000000"
              fill="#FFFFFF"
              fillOpacity="0"
            />
            <rect
              id="Компоненты 5"
              width="104.000000"
              height="163.000000"
              fill="#FFFFFF"
              fillOpacity="0"
            />
            <rect
              id="Прямоугольник 6"
              x="27.368408"
              rx="10.605264"
              width="21.210527"
              height="126.016808"
              fill="#BFC6F4"
              fillOpacity="1.000000"
            />
            <rect
              id="Прямоугольник 6"
              y="66.432770"
              rx="10.605264"
              width="21.210527"
              height="74.651260"
              fill="#D4D8F4"
              fillOpacity="1.000000"
            />
            <rect
              id="Прямоугольник 6"
              x="55.421051"
              y="63.008423"
              rx="10.605264"
              width="21.210527"
              height="99.991592"
              fill="#A3AEF5"
              fillOpacity="1.000000"
            />
            <rect
              id="Прямоугольник 6"
              x="82.789490"
              y="51.365540"
              rx="10.605264"
              width="21.210527"
              height="61.638653"
              fill="#7E8EF2"
              fillOpacity="1.000000"
            />
          </svg>
        </div>
      </div>
      <div
        className="AnswerCardWrapper"
        style={trainingStyles.AnswerCardWrapper}
      >
        <div className="AnswerCard" style={trainingStyles.AnswerCard}>
          <div className="AnswerHead" style={trainingStyles.AnswerHead}>
            <h5 style={trainingStyles.AnswerHeadText}>
              Произнесите '{burrinessCourse[currentPhraseIndex]}'
            </h5>
          </div>
          <div className="AnswerText" style={trainingStyles.AnswerText}>
            <h5 style={trainingStyles.AnswerText}>
              {feedbackMessage || " "}
            </h5>
          </div>
        </div>
      </div>
      <div className="ControlCard" style={trainingStyles.ControlCard}>
        {/* Left Arrow */}
        <button
          onClick={handlePrevPhrase}
          disabled={currentPhraseIndex === 0}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            opacity: currentPhraseIndex === 0 ? 0.5 : 1,
          }}
        >
          <svg
            width="36.666656"
            height="36.666656"
            viewBox="0 0 36.6667 36.6667"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <desc>Created with Pixso.</desc>
            <defs />
            <path
              id="Left arrow"
              d="M33 18.33C33 26.41 26.41 33 18.33 33C10.24 33 3.66 26.41 3.66 18.33C3.66 10.24 10.24 3.66 18.33 3.66C26.41 3.66 33 10.24 33 18.33ZM36.66 18.33C36.66 8.21 28.45 0 18.33 0C8.21 0 0 8.21 0 18.33C0 28.45 8.21 36.66 18.33 36.66C28.45 36.66 36.66 28.45 36.66 18.33ZM18.33 20.16L25.66 20.16L25.66 16.5L18.33 16.5L18.33 11L11 18.33L18.33 25.66L18.33 20.16Z"
              fill="#FFFFFF"
              fillOpacity="1.000000"
              fillRule="evenodd"
            />
          </svg>
        </button>

        {/* AudioRecorder Component */}
        <div>
          <AudioRecorder onFeedbackUpdate={handleFeedbackUpdate} />
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNextPhrase}
          disabled={currentPhraseIndex === totalPhrases - 1}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            opacity: currentPhraseIndex === totalPhrases - 1 ? 0.5 : 1,
          }}
        >
           <svg
            width="36.666687"
            height="36.666656"
            viewBox="0 0 36.6667 36.6667"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <desc>Created with Pixso.</desc>
            <defs />
            <path
              id="Right arrow"
              d="M3.66 18.33C3.66 10.24 10.24 3.66 18.33 3.66C26.41 3.66 33 10.24 33 18.33C33 26.41 26.41 33 18.33 33C10.24 33 3.66 26.41 3.66 18.33ZM0 18.33C0 28.45 8.21 36.66 18.33 36.66C28.45 36.66 36.66 28.45 36.66 18.33C36.66 8.21 28.45 0 18.33 0C8.21 0 0 8.21 0 18.33ZM18.33 16.5L11 16.5L11 20.16L18.33 20.16L18.33 25.66L25.66 18.33L18.33 11L18.33 16.5Z"
              fill="#FFFFFF"
              fillOpacity="1.000000"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}


const buttonStyles = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

const trainingStyles = {
  HeaderContainer: {
    padding: "20px",
    marginBottom: "10px",
  },
  HeaderText: {
    color: "rgb(0, 0, 0)",
    fontSize: "48px",
    fontWeight: "400",
    lineHeight: "65px",
    letterSpacing: "0px",
    textAlign: "left",
  },
  ProgressContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    paddingTop: "0px",
    textAlign: "center",
    margin: 0,
  },
  ProgressText: {
    alignelf: "flex-start",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: "16px",
    color: "#333",
    textAlign: "left",
  },
  ModelLogo: {
    width: "50%",
    height: "50%",
    padding: "0px",
  },
  AnswerCardWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  },
  AnswerCard: {
    borderRadius: "30px",
    background: "#F2F1F1",
    margin: "10px",
    padding: "10px",
    maxWidth: "90%",
    boxSizing: "border-box",
  },
  AnswerHeadText: {
    color: "rgb(0, 0, 0)",
    fontFamily: "Inter",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "24px",
    letterSpacing: "0px",
    textAlign: "center",
  },
  AnswerText: {
    color: "rgb(0, 0, 0)",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "18px",
    letterSpacing: "0px",
    textAlign: "center",
    overflowWrap: "break-word",
  },
  ControlCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: "45px",
    background: "rgb(0, 0, 0)",
    margin: "10px",
    padding: "10px",
  },
};

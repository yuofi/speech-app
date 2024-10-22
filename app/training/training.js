"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // use only on client side
import ProgressBar from "../components/ProgressBar";
import AudioRecorder from "../components/AudioRecorder";
import { courses } from "../courses";
import AnimatedLogo from "../components/AnimatedLogo";
import LeftArrow from "../svg/leftArrow";
import RightArrow from "../svg/RightArrow";

export default function Training() {
  const [hover, setHover] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [courseName, setCourseName] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const searchParams = useSearchParams();
  useEffect(() => {
    if (isClient) {
      let course = searchParams.get("course");
      if (!course) {
        course = localStorage.getItem("lastCourse");
      }
      setCourseName(course);
    }
  }, [isClient, searchParams]);

  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    if (courseName) {
      const courseData = courses[courseName] || { course: [], title: "Курс не найден" };
      setSelectedCourse(courseData.course);
      setSelectedTitle(courseData.title);
    }
  }, [courseName]);

  const totalTasks = selectedCourse.length;
  const [completedTasks, setCompletedTasks] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [completedPhrases, setCompletedPhrases] = useState([]);

  useEffect(() => {
    if (isClient && courseName) {
      const savedTasks = localStorage.getItem(`${courseName}_completedTasks`);
      const savedPhraseIndex = localStorage.getItem(`${courseName}_currentPhraseIndex`);
      const savedCompletedPhrases = JSON.parse(localStorage.getItem(`${courseName}_completedPhrases`)) || [];

      setCompletedTasks(savedTasks ? parseInt(savedTasks) : 0);
      setCurrentPhraseIndex(savedPhraseIndex ? parseInt(savedPhraseIndex) : 0);
      setCompletedPhrases(savedCompletedPhrases);
    }
  }, [isClient, courseName]);

  const handleNextPhrase = () => {
    if (currentPhraseIndex < totalTasks - 1 && completedPhrases[currentPhraseIndex]) {
      const newPhraseIndex = currentPhraseIndex + 1;
      setCurrentPhraseIndex(newPhraseIndex);
      localStorage.setItem(`${courseName}_currentPhraseIndex`, newPhraseIndex);
      setFeedbackMessage("");
    }
  };

  const handlePrevPhrase = () => {
    if (currentPhraseIndex > 0) {
      const newPhraseIndex = currentPhraseIndex - 1;
      setCurrentPhraseIndex(newPhraseIndex);
      localStorage.setItem(`${courseName}_currentPhraseIndex`, newPhraseIndex);
      setFeedbackMessage("");
    }
  };

  const updateProgress = (newCompletedTasks) => {
    const progress = Math.floor((newCompletedTasks / totalTasks) * 100);
    localStorage.setItem(`${courseName}_courseProgress`, progress);
    localStorage.setItem(`${courseName}_completedTasks`, newCompletedTasks);
  };

  const handleFeedbackUpdate = (response) => {
    if (response === 1) {
      setFeedbackMessage("Ваше произношение верно");

      const updatedCompletedPhrases = [...completedPhrases];
      updatedCompletedPhrases[currentPhraseIndex] = true;
      setCompletedPhrases(updatedCompletedPhrases);

      const newCompletedTasks = Math.min(completedTasks + 1, totalTasks);
      setCompletedTasks(newCompletedTasks);
      updateProgress(newCompletedTasks);

      localStorage.setItem(`${courseName}_completedPhrases`, JSON.stringify(updatedCompletedPhrases));
    } else if (response === 2) {
      setFeedbackMessage("Вы произнесли другое слово");
    } else {
      setFeedbackMessage("Попробуйте еще раз");
    }
  };

  // If course is not found or not yet loaded, show a fallback
  if (!selectedCourse.length) {
    return <div>Курс не найден</div>;
  }

  return (
    <div>
      <div className="HeaderContainer" style={trainingStyles.HeaderContainer}>
        <h1 className="HeaderText" style={trainingStyles.HeaderText}>{selectedTitle}</h1>
      </div>

      <div className="ProgressContainer" style={trainingStyles.ProgressContainer}>
        <ProgressBar progress={Math.floor(completedTasks * (100 / totalTasks))} />
        <p className="ProgressText" style={trainingStyles.ProgressText}>
          Прогресс курса: {Math.floor(completedTasks * (100 / totalTasks))}%
        </p>
        <div styles={trainingStyles.ModelLogo}>
          <AnimatedLogo />
        </div>
      </div>

      <div className="AnswerCardWrapper" style={trainingStyles.AnswerCardWrapper}>
        <div className="AnswerCard" style={trainingStyles.AnswerCard}>
          <div className="AnswerHead" style={trainingStyles.AnswerHead}>
            <h5 style={trainingStyles.AnswerHeadText}>
              Произнесите '{selectedCourse[currentPhraseIndex]}'
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
        <div style={hover === 1 ? { ...{ transition: "all 0.3s ease-in-out" }, ...trainingStyles.hoverStyle } : { transition: "all 0.3s ease-in-out" }}
          onMouseEnter={() => setHover(1)}
          onMouseLeave={() => setHover(null)}>
            <button
            onClick={handlePrevPhrase}
            disabled={currentPhraseIndex === 0}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              opacity: currentPhraseIndex === 0 ? 0.5 : 1,
              transition: "all 0.3s ease-in-out",
            }}
          >
            <LeftArrow />
          </button>
        </div>

        <div style={hover === 3 ? { ...trainingStyles.Micro, ...trainingStyles.hoverStyle } : trainingStyles.Micro}
          onMouseEnter={() => setHover(3)}
          onMouseLeave={() => setHover(null)}>
          <AudioRecorder onFeedbackUpdate={handleFeedbackUpdate} phrase={selectedCourse[currentPhraseIndex]} />
        </div>

        <div style={hover === 2 ? { ...{ transition: "all 0.3s ease-in-out" }, ...trainingStyles.hoverStyle } : { transition: "all 0.3s ease-in-out" }}
          onMouseEnter={() => setHover(2)}
          onMouseLeave={() => setHover(null)}>
        <button
          onClick={handleNextPhrase}
          disabled={currentPhraseIndex === totalTasks - 1 || !completedPhrases[currentPhraseIndex]}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            opacity: currentPhraseIndex === totalTasks - 1 || !completedPhrases[currentPhraseIndex] ? 0.5 : 1,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <RightArrow />
        </button>
        </div>
      </div>
    </div>
  );
}

const trainingStyles = {
  Micro: {
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
    transition: "all 0.3s ease-in-out",
  },
  hoverStyle: {
    transform: "scale(1.1)"
  },
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
    alignSelf: "flex-start",
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
    fontFamily: "Noto Sans",
    fontWeight: "100",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "24px",
    letterSpacing: "0px",
    textAlign: "center",
  },
  AnswerText: {
    color: "rgb(0, 0, 0)",
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
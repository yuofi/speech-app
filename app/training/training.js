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
  // Переменная для отслеживания состояния "hover" для интерактивных элементов
  const [hover, setHover] = useState(null);
  // Переменная для проверки, запущен ли код на стороне клиента
  const [isClient, setIsClient] = useState(false);
  // Переменная для хранения имени курса
  const [courseName, setCourseName] = useState(null);

  // Эффект, который обновляет состояние isClient после первого рендера на клиенте
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Получаем параметры из URL, используя useSearchParams
  const searchParams = useSearchParams();
  useEffect(() => {
    if (isClient) {
      let course = searchParams.get("course"); // Получаем параметр "course" из URL
      if (!course) {
        course = localStorage.getItem("lastCourse"); // Если курс не указан, загружаем последний курс из localStorage
      }
      setCourseName(course); // Устанавливаем имя текущего курса
    }
  }, [isClient, searchParams]);

  // Состояния для хранения выбранного курса и его заголовка
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");

  // Эффект, который обновляет выбранный курс и заголовок на основе имени курса
  useEffect(() => {
    if (courseName) {
      const courseData = courses[courseName] || { course: [], title: "Курс не найден" }; // Ищем данные курса
      setSelectedCourse(courseData.course); // Устанавливаем список фраз курса
      setSelectedTitle(courseData.title); // Устанавливаем заголовок курса
    }
  }, [courseName]);

  // Переменные для общего числа упражнений, выполненных упражнений, текущей фразы, сообщения обратной связи, завершенных фраз
  const totalTasks = selectedCourse.length;
  const [completedTasks, setCompletedTasks] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [completedPhrases, setCompletedPhrases] = useState([]);

  // Эффект, который загружает прогресс курса из localStorage, если мы на клиенте и курс известен
  useEffect(() => {
    if (isClient && courseName) {
      const savedTasks = localStorage.getItem(`${courseName}_completedTasks`); // Загружаем количество выполненных упражнений
      const savedPhraseIndex = localStorage.getItem(`${courseName}_currentPhraseIndex`); // Загружаем индекс текущей фразы
      const savedCompletedPhrases = JSON.parse(localStorage.getItem(`${courseName}_completedPhrases`)) || []; // Загружаем завершенные фразы

      setCompletedTasks(savedTasks ? parseInt(savedTasks) : 0); // Устанавливаем количество выполненных упражнений
      setCurrentPhraseIndex(savedPhraseIndex ? parseInt(savedPhraseIndex) : 0); // Устанавливаем индекс текущей фразы
      setCompletedPhrases(savedCompletedPhrases); // Устанавливаем завершенные фразы
    }
  }, [isClient, courseName]);

  //изменяем переменные при переключении на следующую фразу
  const handleNextPhrase = () => {
    if (currentPhraseIndex < totalTasks - 1 && completedPhrases[currentPhraseIndex]) {
      const newPhraseIndex = currentPhraseIndex + 1;
      setCurrentPhraseIndex(newPhraseIndex);
      localStorage.setItem(`${courseName}_currentPhraseIndex`, newPhraseIndex);
      setFeedbackMessage("");
    }
  };
  //изменяем переменные при переключении на предыдущую фразу
  const handlePrevPhrase = () => {
    if (currentPhraseIndex > 0) {
      const newPhraseIndex = currentPhraseIndex - 1;
      setCurrentPhraseIndex(newPhraseIndex);
      localStorage.setItem(`${courseName}_currentPhraseIndex`, newPhraseIndex);
      setFeedbackMessage("");
    }
  };
  //изменяем прогресс при правлилно выполненном задании
  const updateProgress = (newCompletedTasks) => {
    const progress = Math.floor((newCompletedTasks / totalTasks) * 100);
    localStorage.setItem(`${courseName}_courseProgress`, progress);
    localStorage.setItem(`${courseName}_completedTasks`, newCompletedTasks);
  };
  
  //обрабатываем ответ из компоненты AudioRecorder и выводим соответствующую фразу
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

  // Если курс не найден, появится это сообщение
  if (!selectedCourse.length) {
    return <div>Курс не найден</div>;
  }


  return (
    <div>
      {/* заголовок и прогресс */}
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
      {/* сегмент с ответом модели и фразой для произнесения */}
      <div className="AnswerCardWrapper" style={trainingStyles.AnswerCardWrapper}>
        <div className="AnswerCard" style={trainingStyles.AnswerCard}>
          <div className="AnswerHead">
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
    {/* сегмент с кнопками для перехода на следующую или предыдущую фразу и кнопкой записи */}
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
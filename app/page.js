"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { burrinessTitle, burrinessLength } from "./courses/burrinessCourse";
import { fricativesTitle, fricativesLength } from "./courses/fricativesCourse";
import LinkArrow from "./svg/linkArrow.js";

export default function Home() {
  const [hover, setHover] = useState(null);
  const [burrinessProgress, setBurrinessProgress] = useState(0);
  const [burrinessCompletedTasks, setBurrinessCompletedTasks] = useState(0);
  const [fricativesProgress, setFricativesProgress] = useState(0);
  const [fricativesCompletedTasks, setFricativesCompletedTasks] = useState(0);

  // Загружаем прогресс с каждого курса
  useEffect(() => {
    // прогресс с курса по картавости
    const savedBurrinessProgress = localStorage.getItem("burriness_courseProgress");
    const savedBurrinessTasks = localStorage.getItem("burriness_completedTasks");
    if (savedBurrinessProgress && savedBurrinessTasks) {
      setBurrinessProgress(parseInt(savedBurrinessProgress));
      setBurrinessCompletedTasks(parseInt(savedBurrinessTasks));
    }

    // прогресс с курса по картавости
    const savedFricativesProgress = localStorage.getItem("fricatives_courseProgress");
    const savedFricativesTasks = localStorage.getItem("fricatives_completedTasks");
    if (savedFricativesProgress && savedFricativesTasks) {
      setFricativesProgress(parseInt(savedFricativesProgress));
      setFricativesCompletedTasks(parseInt(savedFricativesTasks));
    }
  }, []);

  return (
    <div>
      <div className="HelloContainer" style={styles.HelloContainer}>
        <h1 className="HelloText" style={styles.HelloText}>
          Привет! 👋 время продолжить обучение
        </h1>
      </div>

      <div className="MainContainer" style={styles.MainContainer}>
        <div className="todayCard" style={styles.todayCard}>
          <div className="GoalHeadContainer" style={styles.GoalHeadContainer}>
            <h5 className="GoalHead" style={styles.GoalHead}>
              Моя цель на сегодня
            </h5>
            <span className="GoalEmoji" style={styles.GoalEmoji}>
              🤔
            </span>
          </div>
          <div className="GoalBox" style={styles.GoalBox}>
            <p style={styles.GoalText}>Выполнить 3 упражнения</p>
          </div>
        </div>

        {/* Карточка курса по исправлению картавости */}
        <div className="CourseCard" style={styles.CourseCard}>
          <div className="CourseHeader" style={styles.CourseHeader}>
            <h5 className="CourseTitle" style={styles.CourseTitle}>
              {burrinessTitle}
            </h5>
            <span className="CourseIcon" 
              style={hover === 1 ? { ...styles.CourseIcon, ...styles.hoverStyle } : styles.CourseIcon}
              onMouseEnter={() => setHover(1)}
              onMouseLeave={() => setHover(null)}>
              <Link legacyBehavior href={{ pathname: "/training", query: { course: "burriness" } }}>
                <a
                  onClick={() => {
                    localStorage.setItem("lastCourse", "burriness");
                  }
                  }
                >
                  <LinkArrow />
                </a>
              </Link>
            </span>
          </div>
          <div className="CourseProgress" style={styles.CourseProgress}>
            <div className="ProgressBox" style={styles.ProgressBox}>
              <p style={styles.ProgressText}>{burrinessProgress}%</p>
            </div>
            <div className="ProgressBox" style={styles.ProgressBox}>
              <p style={styles.ProgressText}>{burrinessCompletedTasks}/{burrinessLength}</p>
            </div>
          </div>
        </div>

        {/* Карточка курса по исправлению фрикативности */}
        <div className="CourseCard" style={styles.CourseCard}>
          <div className="CourseHeader" style={styles.CourseHeader}>
            <h5 className="CourseTitle" style={styles.CourseTitle}>
              {fricativesTitle}
            </h5>
            <span className="CourseIcon" 
              style={hover === 2 ? { ...styles.CourseIcon, ...styles.hoverStyle } : styles.CourseIcon}
              onMouseEnter={() => setHover(2)}
              onMouseLeave={() => setHover(null)}>
              <Link legacyBehavior href={{ pathname: "/training", query: { course: "fricatives" } }}>
                <a
                  onClick={() => {
                    localStorage.setItem("lastCourse", "fricatives");
                  }}
                >
                  <LinkArrow />
                </a>
              </Link>
            </span>
          </div>
          <div className="CourseProgress" style={styles.CourseProgress}>
            <div className="ProgressBox" style={styles.ProgressBox}>
              <p style={styles.ProgressText}>{fricativesProgress}%</p>
            </div>
            <div className="ProgressBox" style={styles.ProgressBox}>
              <p style={styles.ProgressText}>{fricativesCompletedTasks}/{fricativesLength}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  hoverStyle: {
    transform: "scale(1.1)",
  },
  todayCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
    margin: "0 auto",
    borderRadius: "30px",
    background: "rgb(231, 251, 188)",
    padding: "5%",
    gap: "10px",
  },
  GoalText: {
    color: "rgb(0, 0, 0)",
    fontSize: "23px",
    fontWeight: "400",
    lineHeight: "29px",
    letterSpacing: "0px",
    textAlign: "center",
    margin: 0,
  },
  GoalBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    border: "2px solid rgb(0, 0, 0)",
    borderRadius: "30px",
    padding: "10px 20px",
    width: "auto",
    margin: 0,
  },
  GoalHead: {
    color: "rgb(0, 0, 0)",
    fontSize: "30px",
    fontWeight: "600",
    lineHeight: "41px",
    letterSpacing: "0px",
    textAlign: "left",
    margin: 0,
  },
  GoalHeadContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  GoalEmoji: {
    fontSize: "30px",
  },
  MainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  HelloContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2%",
    marginLeft: "7%",
  },
  HelloText: {
    fontWeight: "400",
    textAlign: "left",
  },

  CourseCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
    margin: "0 auto",
    borderRadius: "30px",
    background: "rgb(191, 198, 244)",
    padding: "5%",
    gap: "10px",
  },
  CourseHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  CourseTitle: {
    color: "rgb(0, 0, 0)",
    fontSize: "30px",
    fontWeight: "600",
    margin: 0,
  },
  CourseIcon: {
    fontSize: "24px",
    color: "rgb(0, 0, 0)",
    transition: "all 0.3s ease-in-out",
  },
  CourseProgress: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "10px",
  },
  ProgressBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: "40px",
    borderRadius: "20px",
    border: "2px solid black",
  },
  ProgressText: {
    fontSize: "18px",
    fontWeight: "500",
    margin: 0,
  },
};

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { burrinessCourse, burrinessTitle } from "./courses/burrinessCourse";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const totalTasks = burrinessCourse.length;

  // Retrieve progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("courseProgress");
    const savedTasks = localStorage.getItem("completedTasks");
    if (savedProgress && savedTasks) {
      setProgress(parseInt(savedProgress));
      setCompletedTasks(parseInt(savedTasks));
    }
  }, []);


  return (
    <div>
      <div className="HelloContainer" style={styles.HelloContainer}>
        <h1 className="HelloText" style={styles.HelloText}>
          Привет, 👋 Имя, время продолжить обучение
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

        <div className="CourseCard" style={styles.CourseCard}>
          <div className="CourseHeader" style={styles.CourseHeader}>
            <h5 className="CourseTitle" style={styles.CourseTitle}>
              {burrinessTitle}
            </h5>
            <span className="CourseIcon" style={styles.CourseIcon}>
              <Link legacyBehavior href="/training">
                <svg
                  width="44.000000"
                  height="44.000000"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <desc>Created with Pixso.</desc>
                  <defs />
                  <rect
                    id="фрейм 2"
                    width="44.000000"
                    height="44.000000"
                    fill="#FFFFFF"
                    fillOpacity="0"
                  />
                  <rect
                    id="фрейм 1"
                    width="44.000000"
                    height="44.000000"
                    fill="#FFFFFF"
                    fillOpacity="0"
                  />
                  <circle
                    id="Эллипс 2"
                    cx="22.000000"
                    cy="22.000000"
                    r="22.000000"
                    fill="#FFFFFF"
                    fillOpacity="0"
                  />
                  <circle
                    id="Эллипс 2"
                    cx="22.000000"
                    cy="22.000000"
                    r="20.500000"
                    stroke="#000000"
                    strokeOpacity="1.000000"
                    strokeWidth="3.000000"
                  />
                  <path
                    id="矢量 13"
                    d="M19 13L19 15.4L26.9 15.4L13 29.3L14.69 31L28.6 17.09L28.6 25L31 25L31 13L19 13Z"
                    fill="#000000"
                    fillOpacity="1.000000"
                    fillRule="evenodd"
                  />
                </svg>
              </Link>
            </span>
          </div>
          <div className="CourseProgress" style={styles.CourseProgress}>
            <div className="ProgressBox" style={styles.ProgressBox}>
            <p style={styles.ProgressText}>{progress}%</p>
            </div>
            <div className="ProgressBox" style={styles.ProgressBox}>
              <p style={styles.ProgressText}>{completedTasks}/{totalTasks}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
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
    marginLeft: "10%",
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

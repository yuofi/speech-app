import { useEffect, useState } from "react";
import Link from "next/link";
import HomeIcon from "../svg/homeIcon";
import TrainIcon from "../svg/trainIcon";
import TipsIcon from "../svg/tipsIcon";

export default function Navbar() {
  const [hover, setHover] = useState(null);

  return (
    <nav className="navbar" style={styles.Navbar}>
      <ul style={styles.navList}>
        <li>
          <Link legacyBehavior href="/">
            <a
              /* используем наведение мыши на объект для анимации*/
              style={
                hover === 1
                  ? { ...styles.navIcon, ...styles.hoverStyle }
                  : styles.navIcon
              }
              onMouseEnter={() => setHover(1)}
              onMouseLeave={() => setHover(null)}
            >
              <HomeIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href={"/training"}>
            <a
            /* используем наведение мыши на объект для анимации*/
              style={
                hover === 2
                  ? { ...styles.navIcon, ...styles.hoverStyle }
                  : styles.navIcon
              }
              onMouseEnter={() => setHover(2)}
              onMouseLeave={() => setHover(null)}
            >
              <TrainIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/tips">
            <a
            /* используем наведение мыши на объект для анимации*/
              style={
                hover === 3
                  ? { ...styles.navIcon, ...styles.hoverStyle }
                  : styles.navIcon
              }
              onMouseEnter={() => setHover(3)}
              onMouseLeave={() => setHover(null)}
            >
              <TipsIcon />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    transition: "all 0.3s ease-in-out",
  },
  hoverStyle: {
    transform: "scale(1.1)",
  },

  Navbar: {
    display: "flex",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40px",
    backgroundColor: "#fff",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: 0,
    margin: 0,
  },
};

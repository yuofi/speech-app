import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [hover, setHover] = useState(null);

  return (
    <nav className="navbar" style={styles.Navbar}>
      <ul style={styles.navList}>
        <li>
          <Link legacyBehavior href="/">
            <a
              style={
                hover === 1
                  ? { ...styles.navIcon, ...styles.hoverStyle }
                  : styles.navIcon
              }
              onMouseEnter={() => setHover(1)}
              onMouseLeave={() => setHover(null)}
            >
              <svg
                width="32.25"
                height="33.5627"
                viewBox="0 0 32.25 33.5627"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <desc>Created with Pixso.</desc>
                <defs />
                <path
                  id="свектор 20"
                  d="M17.91 29.97L28.66 29.97L28.66 13.81L16.12 4.06L3.58 13.81L3.58 29.97L14.33 29.97L14.33 19.22L17.91 19.22L17.91 29.97ZM32.25 31.77C32.25 32.24 32.06 32.7 31.72 33.03C31.38 33.37 30.93 33.56 30.45 33.56L1.79 33.56C1.31 33.56 0.86 33.37 0.52 33.03C0.18 32.7 0 32.24 0 31.77L0 12.94C-0.01 12.66 0.06 12.39 0.18 12.15C0.3 11.9 0.47 11.69 0.69 11.52L15.02 0.37C15.33 0.13 15.72 0 16.12 0C16.52 0 16.91 0.13 17.22 0.37L31.55 11.52C31.77 11.69 31.94 11.9 32.06 12.15C32.18 12.39 32.25 12.66 32.25 12.94L32.25 31.77L32.25 31.77Z"
                  fill="#444444"
                  fillOpacity="1.000000"
                  fillRule="evenodd"
                />
              </svg>
            </a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href={"/training"}>
            <a
              style={
                hover === 2
                  ? { ...styles.navIcon, ...styles.hoverStyle }
                  : styles.navIcon
              }
              onMouseEnter={() => setHover(2)}
              onMouseLeave={() => setHover(null)}
            >
              <svg
                width="43.000000"
                height="43.000000"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <desc>Created with Pixso.</desc>
                <defs>
                  <clipPath id="clip3_29">
                    <rect
                      id="toll"
                      width="43.000000"
                      height="43.000000"
                      fill="white"
                      fillOpacity="0"
                    />
                  </clipPath>
                </defs>
                <rect
                  id="toll"
                  width="43.000000"
                  height="43.000000"
                  fill="#FFFFFF"
                  fillOpacity="0"
                />
                <g clipPath="url(#clip3_29)">
                  <path
                    id="矢量 333"
                    d="M27.33 7C19.41 7 13 13.41 13 21.33C13 29.25 19.41 35.66 27.33 35.66C35.25 35.66 41.66 29.25 41.66 21.33C41.66 13.41 35.25 7 27.33 7ZM27.33 32.08C21.4 32.08 16.58 27.26 16.58 21.33C16.58 15.4 21.4 10.58 27.33 10.58C33.26 10.58 38.08 15.4 38.08 21.33C38.08 27.26 33.26 32.08 27.33 32.08Z"
                    fill="#444444"
                    fillOpacity="1.000000"
                    fillRule="evenodd"
                  />
                  <path
                    id="矢量 334"
                    d="M5.37 21.5C5.37 16.82 8.36 12.84 12.54 11.37L12.54 7.63C6.36 9.22 1.79 14.81 1.79 21.5C1.79 28.18 6.36 33.77 12.54 35.36L12.54 31.62C8.36 30.15 5.37 26.17 5.37 21.5Z"
                    fill="#444444"
                    fillOpacity="1.000000"
                    fillRule="evenodd"
                  />
                </g>
              </svg>
            </a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/tips">
            <a
              style={
                hover === 3
                  ? { ...styles.navIcon, ...styles.hoverStyle }
                  : styles.navIcon
              }
              onMouseEnter={() => setHover(3)}
              onMouseLeave={() => setHover(null)}
            >
              <svg
                width="35.833313"
                height="35.833344"
                viewBox="0 0 35.8333 35.8333"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <desc>Created with Pixso.</desc>
                <defs />
                <path
                  d="M17.91 15.94C16.82 15.94 15.94 16.82 15.94 17.91C15.94 19 16.82 19.88 17.91 19.88C19 19.88 19.88 19 19.88 17.91C19.88 16.82 19 15.94 17.91 15.94ZM17.91 0C8.02 0 0 8.02 0 17.91C0 27.8 8.02 35.83 17.91 35.83C27.8 35.83 35.83 27.8 35.83 17.91C35.83 8.02 27.8 0 17.91 0ZM21.84 21.84L7.16 28.66L13.99 13.99L28.66 7.16L21.84 21.84Z"
                  fill="#444444"
                  fillOpacity="1.000000"
                  fillRule="evenodd"
                />
              </svg>
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

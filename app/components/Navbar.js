import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar" style={styles.Navbar}>
      <ul style={styles.navList}>
        <li>
          <Link legacyBehavior href="/">
            <a style={styles.homeIcon}>
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
          <Link
            legacyBehavior
            href={"/training"}
          >
            <a style={styles.homeIcon}>
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
          <Link legacyBehavior href="/settings">
            <a style={styles.homeIcon}>
              <svg
                width="33.461166"
                height="34.399963"
                viewBox="0 0 33.4612 34.4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <desc>Created with Pixso.</desc>
                <defs />
                <path
                  id="settings 286"
                  d="M29.52 18.88C29.59 18.34 29.63 17.79 29.63 17.2C29.63 16.62 29.59 16.05 29.5 15.51L33.14 12.68C33.46 12.43 33.55 11.95 33.35 11.59L29.91 5.64C29.7 5.24 29.25 5.12 28.86 5.24L24.57 6.96C23.68 6.28 22.73 5.71 21.67 5.28L21.03 0.73C20.95 0.3 20.6 0 20.17 0L13.29 0C12.86 0 12.52 0.3 12.44 0.73L11.8 5.28C10.74 5.71 9.77 6.3 8.9 6.96L4.61 5.24C4.22 5.1 3.77 5.24 3.56 5.64L0.13 11.59C-0.08 11.96 -0.01 12.43 0.35 12.68L3.99 15.51C3.9 16.05 3.83 16.64 3.83 17.2C3.83 17.75 3.86 18.34 3.95 18.88L0.31 21.71C-0.01 21.96 -0.1 22.44 0.1 22.8L3.54 28.75C3.75 29.15 4.2 29.27 4.6 29.15L8.88 27.43C9.77 28.11 10.72 28.68 11.78 29.11L12.43 33.66C12.52 34.09 12.86 34.4 13.29 34.4L20.17 34.4C20.6 34.4 20.95 34.09 21.01 33.66L21.65 29.11C22.71 28.68 23.68 28.11 24.56 27.43L28.84 29.15C29.23 29.29 29.68 29.15 29.89 28.75L33.33 22.8C33.55 22.41 33.46 21.96 33.12 21.71L29.52 18.88ZM16.73 23.65C13.18 23.65 10.28 20.74 10.28 17.2C10.28 13.65 13.18 10.75 16.73 10.75C20.27 10.75 23.18 13.65 23.18 17.2C23.18 20.74 20.27 23.65 16.73 23.65Z"
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
  homeIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },
  Navbar: {
    display: "flex",
    alignItems: "center",
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40px',
    backgroundColor: '#fff',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

"use client";

import "./globals.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          })
          .catch((error) => {
            console.error("ServiceWorker registration failed: ", error);
          });
      });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Указание на manifest.json */}
        <link rel="manifest" href="/manifest.json" />
        {/* Указание иконок для PWA (можете настроить по своему усмотрению) */}
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body style={styles.body}>
        <Header style={styles.header}/>
        <main style={styles.main}>{children}</main>
        <Navbar style={styles.navbar} />
      </body>
    </html>
  );
}

const styles = {
  header: {
    backgroundColor: "#fff",
    border: "none",
    boxShadow: "none"
  },
  body: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    margin: 0,
  },
  main: {
    flex: 1,
  },
  navbar: {
    marginTop: "auto",
  },
};

"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MarkdownViewer from "../components/MarkdownViewer";

const TipsPage = () => {
  const searchParams = useSearchParams();
  const [filePath, setFilePath] = useState("/markdown/burriness.md");
  
  //ищем нужную страницу в папке markdown
  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setFilePath(`/markdown/${page}.md`); 
    }
  }, [searchParams]);

  return (
    <div style={styles.body}>
      <h1 style={{ textAlign: "center" }}>Советы и материалы</h1>
      <MarkdownViewer filePath={filePath} />
      <div style={styles.navLinks}>
        <a href="?page=burriness" style={styles.link}>1</a>
        <a href="?page=fricativeness" style={styles.link}>2</a>
      </div>
    </div>
  );
};

export default TipsPage;

const styles = {
  body: {
    padding: "20px",
  },
  navLinks: {
    marginTop: "20px",
    textAlign: "center",
  },
  link: {
    marginRight: "15px",
    color: "grey",
    textDecoration: "none",
    cursor: "pointer",
  },
};

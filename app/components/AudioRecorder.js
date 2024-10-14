import React, { useState, useRef } from "react";
import { CircularProgress } from "@mui/material";

const AudioRecorder = ({ onFeedbackUpdate }) => {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
          chunks.current.push(event.data);
        };
        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setRecording(true);
      })
      .catch((err) => console.error("Error accessing microphone: ", err));
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      try {
        mediaRecorderRef.current.stop();
        setRecording(false);

        const blob = new Blob(chunks.current, { type: "audio/mpeg" });
        chunks.current = [];

        const formData = new FormData();
        formData.append("audio", blob, "audio.mp3");

        setUploading(true);

        const response = await fetch("https://yufii-speech-defects.hf.space/process-audio", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          let errorMessage = `HTTP error! Status: ${response.status}`;
          try {
            const errorData = await response.json();
            if (errorData && errorData.detail) {
              errorMessage = errorData.detail;
            }
          } catch (jsonError) {
            // Ignore JSON parsing errors
          }
          throw new Error(errorMessage);
        }

        const result = await response.json();
        if (result && result.prediction) {
          onFeedbackUpdate(Math.round(result.prediction)); // Передача результата предсказания
        } else {
          console.warn("Unexpected response from server:", result);
        }
      } catch (error) {
        console.error("Error during audio recording or processing:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {recording ? (
        <button
          onClick={stopRecording}
          style={{
            backgroundColor: "#000",
            border: "none",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="28" cy="28" r="28" fill="#FFFFFF" />
            <circle cx="28" cy="28" r="26.5" stroke="#FFFFFF" strokeWidth="3" />
            <g clipPath="url(#clip9_47)">
              <path
                d="M28 31.66C31.04 31.66 33.48 29.21 33.48 26.16L33.5 15.16C33.5 12.12 31.04 9.66 28 9.66C24.95 9.66 22.5 12.12 22.5 15.16L22.5 26.16C22.5 29.21 24.95 31.66 28 31.66ZM25.8 14.98C25.8 13.77 26.79 12.78 28 12.78C29.21 12.78 30.2 13.77 30.2 14.98L30.18 26.35C30.18 27.56 29.21 28.55 28 28.55C26.79 28.55 25.8 27.56 25.8 26.35L25.8 14.98ZM37.71 26.16C37.71 31.66 33.06 35.51 28 35.51C22.94 35.51 18.28 31.66 18.28 26.16L15.16 26.16C15.16 32.41 20.15 37.58 26.16 38.48L26.16 44.5L29.83 44.5L29.83 38.48C35.84 37.6 40.83 32.43 40.83 26.16L37.71 26.16Z"
                fill="#000000"
              />
            </g>
          </svg>
        </button>
      ) : (
        <button
          onClick={startRecording}
          style={{
            backgroundColor: "#000",
            border: "none",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="28" cy="28" r="28" fill="#FFFFFF" />
            <circle cx="28" cy="28" r="26.5" stroke="#FFFFFF" strokeWidth="3" />
            <g clipPath="url(#clip9_47)">
              <path
                d="M28 31.66C31.04 31.66 33.48 29.21 33.48 26.16L33.5 15.16C33.5 12.12 31.04 9.66 28 9.66C24.95 9.66 22.5 12.12 22.5 15.16L22.5 26.16C22.5 29.21 24.95 31.66 28 31.66ZM25.8 14.98C25.8 13.77 26.79 12.78 28 12.78C29.21 12.78 30.2 13.77 30.2 14.98L30.18 26.35C30.18 27.56 29.21 28.55 28 28.55C26.79 28.55 25.8 27.56 25.8 26.35L25.8 14.98ZM37.71 26.16C37.71 31.66 33.06 35.51 28 35.51C22.94 35.51 18.28 31.66 18.28 26.16L15.16 26.16C15.16 32.41 20.15 37.58 26.16 38.48L26.16 44.5L29.83 44.5L29.83 38.48C35.84 37.6 40.83 32.43 40.83 26.16L37.71 26.16Z"
                fill="#000000"
              />
            </g>
          </svg>
        </button>
      )}
      {uploading && (
        <CircularProgress
          size={70}
          style={{
            position: "absolute",
            top: "2.2px",
            left: "2.2px",
          }}
        />
      )}
    </div>
  );
};

export default AudioRecorder;

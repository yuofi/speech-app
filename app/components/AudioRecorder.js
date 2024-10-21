import React, { useState, useRef } from "react";
import { CircularProgress } from "@mui/material";
import Micro from "../svg/mirco";

const AudioRecorder = ({ onFeedbackUpdate, phrase }) => {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        // Listen for the 'dataavailable' event and push the recorded chunks
        mediaRecorder.ondataavailable = (event) => {
          chunks.current.push(event.data);
        };

        // Listen for the 'stop' event to handle sending the audio after recording stops
        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunks.current, { type: "audio/mpeg" });
          chunks.current = [];  

          const formData = new FormData();
          formData.append("audio", blob, "audio.mp3");
          formData.append("phrase", phrase);

          setUploading(true);

          try {
            const response = await fetch("http://127.0.0.1:8000/process-audio", {
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

            if (
              result &&
              result.prediction &&
              Array.isArray(result.prediction) &&
              result.prediction.length > 0 &&
              Array.isArray(result.prediction[0]) &&
              result.prediction[0].length > 0
            ) {
              if (result.match_phrase) {
                onFeedbackUpdate(Math.round(result.prediction));
              } else {
                onFeedbackUpdate(2); 
              }
            } else {
              console.warn("Unexpected response format from server:", result);
            }
          } catch (error) {
            console.error("Error during audio recording or processing:", error);
          } finally {
            setUploading(false);
          }
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setRecording(true);
      })
      .catch((err) => console.error("Error accessing microphone: ", err));
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div style={{ position: "relative", width: "72px", height: "72px" }}>
      <button
        onClick={recording ? stopRecording : startRecording}
        style={{
          backgroundColor: "#fff",
          border: recording ? "4px solid rgb(191, 198, 244)" : "4px solid #000",
          borderRadius: "50%",
          width: "64px",
          height: "64px",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          zIndex: 1,
          transform: "translate(4px, 4px)"
        }}
      >
        <Micro />
      </button>
      {uploading && (
        <CircularProgress
          size={72}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
          thickness={4}
        />
      )}
    </div>
  );
};

export default AudioRecorder;

import React, { useState, useRef } from "react";
import { CircularProgress } from "@mui/material";
import Micro from "../svg/mirco";

const AudioRecorder = ({ onFeedbackUpdate, phrase }) => {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  //функция для начала записи
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        // Listen for the 'dataavailable' event and push the recorded chunks
        mediaRecorder.ondataavailable = (event) => {
          chunks.current.push(event.data);
        };

        // При остановке записи обрабатываем аудио и отправляем на сервер
        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunks.current, { type: "audio/mpeg" });
          chunks.current = [];

          //добавляем аудио и фразу для отправки на серевер
          const formData = new FormData();
          formData.append("audio", blob, "audio.mp3");
          formData.append("phrase", phrase);

          setUploading(true);

          //отправляем данные на сервер для прогона через модель и принимаем ответ
          try {
            const response = await fetch(
              "https://701w-speech-defects.hf.space/process-audio",
              {
                method: "POST",
                body: formData,
              }
            );

            //обработка ошибок
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

            //обрабатываем ответ с сервера (ответ модели и соответствие слова изначальному)
            const result = await response.json();

            if (
              result &&
              result.prediction &&
              Array.isArray(result.prediction[0])
            ) {
              const predictionValues = result.prediction[0]; // Extract the prediction values

              let feedbackValue;
              if (result.match_phrase) {
                feedbackValue = Math.round(predictionValues[0]); // Use the first prediction value if the phrase matches
              } else {
                feedbackValue = 2; // Default to 2 if the phrase doesn't match
              }

              onFeedbackUpdate(feedbackValue);
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

  //завершаем запись
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
          borderRadius: recording ? "20%" : "50%",
          width: "64px",
          height: "64px",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          zIndex: 1,
          transform: "translate(4px, 4px)",
          transition: "all 0.3s ease-in-out",
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

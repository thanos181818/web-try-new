import React, { useState, useRef } from "react";
import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./components/HomePage";
import Page2 from './components/Page2'
import v1 from './components/0033_fake.json';
import v2 from './components/0033_real.json';
import v3 from './components/0014_real.json';
import v4 from './components/0014_fake.json';
import v5 from './components/0040_real.json';
import v6 from './components/0040_fake.json';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [analysisState, setAnalysisState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [report, setReport] = useState(null);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    if (!file.type.startsWith("video/")) {
      setErrorMessage("Error: Only video files are supported.");
      setThumbnail(null);
      return;
    }

    setErrorMessage("");
    let name = file.name;
    if (name === "0033_fake.mp4") {
      setReport(v1);
    } else if (name === "0033_real.mp4") {
      setReport(v2);
    } else if (name === "0014_real.mp4") {
      setReport(v3);
    } else if (name === "0014_fake.mp4") {
      setReport(v4);
    } else if (name === "0040_real.mp4") {
      setReport(v5);
    } else if (name === "0040_fake.mp4") {
      setReport(v6);
    } else {
      setReport(null);
    }
    setAnalysisState("uploading");

    let progressValue = 0;
    const interval = setInterval(() => {
      if (progressValue >= 100) {
        clearInterval(interval);
        setAnalysisState("completed");
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
          navigateToPage2();
        }, 3000);
      } else {
        progressValue += 20;
        setProgress(progressValue);
      }
    }, 500);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleChooseFile = (e) => {
    if (e && e.target === fileInputRef.current) {
      return;
    }
    fileInputRef.current.click();
  };

  const navigateToPage2 = () => {
    navigate("/Page2");
  };

  return (
    <div className="app-container">
      {showAnimation && (
        <div className="fullscreen-animation">
          <h1>Processing...</h1>
        </div>
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={
          <HomePage 
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleChooseFile={handleChooseFile}
            fileInputRef={fileInputRef}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            setThumbnail={setThumbnail}
            setErrorMessage={setErrorMessage}
            video = {video}
            report = {report}
          />
        } />
        
        <Route path="/Page2" element={
          <Page2
            videoMetadata={report?.video_metadata || {}}
            anomalies={report?.anomalies || []}
            thumbnail = {thumbnail}
          />
        } />
      </Routes>
    </div>
  );
};

export default App;


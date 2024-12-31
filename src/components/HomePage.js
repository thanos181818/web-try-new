import React, { useRef, useState, useCallback } from "react";
import { Upload, AlertTriangle, SkipBack, SkipForward } from 'lucide-react';
import './HomePage.css';

const HomePage = ({ 
  handleDrop, 
  handleDragOver, 
  handleChooseFile, 
  fileInputRef, 
  handleInputChange, 
  errorMessage,
  setThumbnail,
  setErrorMessage
}) => {
  const [localThumbnail, setLocalThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const generateThumbnail = useCallback((time) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas && videoFile) {
      video.currentTime = time;

      video.onseeked = () => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL('image/jpeg');
          setLocalThumbnail(thumbnailUrl);
          setThumbnail(thumbnailUrl);
          setCurrentTime(video.currentTime);
        }
      };
    }
  }, [videoFile, setThumbnail]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const video = videoRef.current;
      if (video) {
        video.src = URL.createObjectURL(file);
        video.onloadedmetadata = () => {
          setTimeout(() => generateThumbnail(0), 100);
        };
      }
      handleInputChange(event);
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      const video = videoRef.current;
      if (video) {
        video.src = URL.createObjectURL(file);
        video.onloadedmetadata = () => {
          setTimeout(() => generateThumbnail(0), 100);
        };
      }
      handleDrop(event);
    } else {
      setErrorMessage("Error: Only video files are supported.");
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      const newTime = Math.max(0, currentTime - 5);
      generateThumbnail(newTime);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      const newTime = Math.min(videoRef.current.duration, currentTime + 5);
      generateThumbnail(newTime);
    }
  };

  console.log('Local thumbnail:', localThumbnail);

  return (
    <main className="container">
      <section className="hero">
        <h1>Detect DeepFakes</h1>
        <p>
          Upload a video to analyze and detect potential deepfake content.
        </p>
      </section>

      <section className="upload-section">
        <div className="card full-width">
          <div
            id="dropZone"
            className="drop-zone"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onClick={handleChooseFile}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleChooseFile();
              }
            }}
          >
            {localThumbnail ? (
              <div className="thumbnail-container">
                <img src={localThumbnail} alt="Video thumbnail" className="video-thumbnail" />
                <div className="thumbnail-controls">
                  <button onClick={handleSkipBackward} aria-label="Skip backward">
                    <SkipBack size={24} />
                  </button>
                  <button onClick={handleSkipForward} aria-label="Skip forward">
                    <SkipForward size={24} />
                  </button>
                </div>
              </div>
            ) : errorMessage ? (
              <div className="error-box">
                <AlertTriangle size={24} />
                <p>{errorMessage}</p>
              </div>
            ) : (
              <>
                <Upload size={48} />
                <p>Drag & drop a video file or click here to browse</p>
              </>
            )}
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              accept="video/*"
              aria-label="Upload video file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button className="btn choose-file-btn" onClick={(e) => {
              e.stopPropagation();
              handleChooseFile();
            }}>
              Choose File
            </button>
          </div>
        </div>
      </section>

      {/* Hidden video and canvas elements for thumbnail generation */}
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </main>
  );
};

export default HomePage;


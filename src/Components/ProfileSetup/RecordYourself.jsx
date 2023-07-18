import React, { useRef, useState , useEffect } from 'react';
import styles from './styles.module.css';

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [previewClicked, setPreviewClicked] = useState(false);

  const handleStartRecording = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.addEventListener(
        'dataavailable',
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => prev.concat(event.data));
    }
  };

  const handlePreviewRecording = () => {
    setPreviewClicked(true);
  };
  
  useEffect(() => {
    if (previewClicked) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const previewVideo = document.createElement('video');
      previewVideo.src = url;
      previewVideo.controls = true;
      previewVideo.style.width = '640px';
      previewVideo.style.height = '480px';
  
      const previewContainer = document.getElementById('preview-container');
      if (previewContainer) {
        previewContainer.innerHTML = '';
        previewContainer.appendChild(previewVideo);
      } else {
        console.error('Preview container not found');
      }
    }
  }, [previewClicked]);
  
  const handleRecordAgain = () => {
    setPreviewClicked(false);
    setRecordedChunks([]);
  };

  return (
    <div className={styles.CreateProfile}>
      <div className={styles.RecordingContainer}>
        {isRecording && !previewClicked && (
          <video ref={videoRef} width="700" height="400" muted autoPlay></video>
        )}
        {!isRecording && !previewClicked && (
          <img src="/StaticImages/VideoPreview.png" />
        )}
        {!isRecording && recordedChunks.length > 0 && (
          <div id="preview-container"></div>
        )}
        <div>
          {isRecording && !previewClicked ? (
            <button onClick={handleStopRecording} disabled={!isRecording}>
              Stop Recording
            </button>
          ) : (
            <button onClick={handleStartRecording} disabled={isRecording}>
              Start Recording
            </button>
          )}
          {recordedChunks.length > 0 && (
            <button onClick={handlePreviewRecording}>
              Preview Recording
            </button>
          )}
          {previewClicked && (
            <button onClick={handleRecordAgain}>Record Again</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;

import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.module.css';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Step4 } from './API';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';


const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [previewClicked, setPreviewClicked] = useState(false);

  const Navigate = useNavigate();

  const handleStartRecording = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
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
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
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

      const previewContainer = document.getElementById('preview-container');
      if (previewContainer) {
        previewContainer.innerHTML = '';
        previewContainer.appendChild(previewVideo);
      } else {
        console.error('Preview container not found');
      }
    }
  }, [previewClicked]);

  const handleRecordAgain = async () => {
    setPreviewClicked(false);
    setRecordedChunks([]);
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
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

  const Submit = async () => {
    let data = {
      "Video": "https://premedpk-cdn.sgp1.cdn.digitaloceanspaces.com/CDN/UniLogos/AKU-Logo.png"
    }

    Step4(data).then(
      (response) => {
        console.log(response)
        if (response.status === 200) {
          notification.success({
            message: 'Profile Created Successfully',
            description: 'Your profile has been created successfully',
            placement: 'bottomRight'
          })
          Navigate('/dashboard', { replace: true })
        }
      }
    ).catch(
      (error) => {
        notification.error({
          message: 'Error',
          description: 'Something went wrong',
          placement: 'bottomRight'
        })
      }
    )
  }

  return (
    <div className={styles.CreateProfile}>
      <div className={styles.RecordingContainer}>
        {isRecording && !previewClicked &&
          (
            <div className={styles.videoDisplay}>
              <video ref={videoRef} width="700" height="400" autoPlay className={styles.Video}></video>
            </div>
          )}
        {!isRecording && !previewClicked && (
          <div className={styles.InitialVideoBox}>
            <div className={styles.Instructions}>
              <h3>Instructions</h3>

              <div className={styles.Pointers}>
                <DoneAllIcon className={styles.Icon} />
                <h6><b>Recording a Video:</b></h6>
              </div>

              <div className={styles.PointersDetails}>
                <h6>Start by clicking the "Start Recording" button. This will request permission to access your device's camera.</h6>
                <h6>If prompted, allow the website to access your camera.</h6>
                <h6>Once the camera is activated, you'll see a live video feed in the recording area.</h6>
                <h6>Click the "Stop Recording" button when you want to stop recording the video. This will end the recording process.</h6>
              </div>

              <div className={styles.Pointers}>
                <DoneAllIcon className={styles.Icon} />
                <h6><b>Previewing the Recorded Video:</b></h6>
              </div>

              <div className={styles.PointersDetails}>
                <h6>After stopping the recording, click the "Preview Recording" button.</h6>
                <h6>A preview of your recorded video will appear in the preview area below the recording area.</h6>
              </div>

              <div className={styles.Pointers}>
                <DoneAllIcon className={styles.Icon} />
                <h6><b>Recording Again (If Needed):</b></h6>
              </div>

              <div className={styles.PointersDetails}>
                <h6>If you're not satisfied with the recording and want to record again, click the "Record Again" button.</h6>
                <h6>This will clear the previous recording and allow you to start a new recording from scratch.</h6>
              </div>
            </div>
            <img src="/StaticImages/VideoPreview.png" />
          </div>
        )}
        {previewClicked &&
          (
            <div className={styles.videoDisplay}>
              <div id="preview-container" className={styles.Video}></div>
            </div>
          )}
        <div className={styles.ButtonDiv}>
          {isRecording && !previewClicked ? (
            <button onClick={handleStopRecording} disabled={!isRecording}>
              Stop Recording
            </button>
          ) : (
            <button onClick={handleStartRecording} disabled={isRecording}>
              Start Recording
            </button>
          )}
          {recordedChunks.length > 0 && !previewClicked && (
            <button onClick={handlePreviewRecording}>
              Preview Recording
            </button>
          )}
          {previewClicked && (
            <button onClick={handleRecordAgain}>Record Again</button>
          )}

          {recordedChunks.length > 0 &&
            <button onClick={Submit}>
              Submit
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;

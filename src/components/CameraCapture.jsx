import React, {useState, useRef} from 'react';
import Webcam from 'react-webcam';
import {Button, Divider} from "antd";

function CameraCapture(props) {
  const webcamRef = useRef(null);
  const {image, setImage} = props;

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    setImage(imageSrc);
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        style={{width: '100%', height: '400px'}}
        audio={false}
        screenshotFormat="image/jpeg"
      />

      <Button type={"primary"} onClick={capture}>Take Photo</Button>

      {image && (
        <div>
          <Divider>Show</Divider>
          <img src={image} alt="Captured Image" style={{maxWidth: '100%'}}/>
        </div>
      )}
    </>
  );
}

export default CameraCapture;

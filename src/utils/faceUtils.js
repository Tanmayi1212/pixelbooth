import * as faceapi from 'face-api.js';

let modelsLoaded = false;

export const loadModels = async () => {
  if (modelsLoaded) return;

  const MODEL_URL = '/models';

  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(`${MODEL_URL}/tiny_face_detector`),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri(`${MODEL_URL}/face_landmark_68_tiny`),
    ]);
    modelsLoaded = true;
    console.log('✅ Models loaded');
  } catch (err) {
    console.error('❌ Failed to load models:', err);
    throw err;
  }
};

export const detectFaceLandmarks = async (canvas) => {
  if (!modelsLoaded) {
    throw new Error('Models not loaded. Call loadModels() first.');
  }

  const detection = await faceapi
    .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks(true);

  return detection?.landmarks || null;
};
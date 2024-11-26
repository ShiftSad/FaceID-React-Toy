import React, {useEffect, useRef, useState} from "react";

import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.ts";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { Camera } from '@mediapipe/camera_utils';
import {doc, getFirestore, setDoc } from "firebase/firestore";
import {FaceMesh} from "@mediapipe/face_mesh";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [faceData, setFaceData] = useState<number[] | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const db = getFirestore();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            Cookies.remove('userDisplayName');
            Cookies.remove('userEmail');
            navigate('/login');
        } catch (error: unknown) {
            if (error instanceof Error) alert(error.message);
            else alert('An unexpected error occurred.');
        }
    };

    const saveFaceData = async () => {
        const email = Cookies.get('userEmail') || 'unknown';
        const uid = auth.currentUser?.uid;

        if (!faceData || !uid) {
            alert('No face data to save.');
            return;
        }

        // Save faceData to Firestore
        await setDoc(doc(db, 'users', uid), {
            email,
            faceData,
        });

        alert('Face data saved successfully!');
    };

    useEffect(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const faceMesh = new FaceMesh({
            locateFile: (file) =>
                `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        faceMesh.onResults((results) => {
            const canvasCtx = canvasRef.current!.getContext('2d');
            if (!canvasCtx || !results.multiFaceLandmarks) return;

            // Draw landmarks
            canvasCtx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            canvasCtx.drawImage(
                results.image,
                0,
                0,
                canvasRef.current!.width,
                canvasRef.current!.height
            );

            results.multiFaceLandmarks.forEach((landmarks) => {
                setFaceData(landmarks.flatMap(({ x, y, z }) => [x, y, z])); // Encode face data
            });
        });

        const camera = new Camera(videoRef.current, {
            onFrame: async () => {
                await faceMesh.send({ image: videoRef.current! });
            },
            width: 640,
            height: 480,
        });

        camera.start();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, {Cookies.get('userDisplayName')}!</h1>
            <video ref={videoRef} style={{ display: 'none' }} autoPlay />
            <canvas ref={canvasRef} width="640" height="480" style={{ border: '1px solid black' }} />
            <button
                onClick={saveFaceData}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Save Face Data
            </button>
            <button
                onClick={handleLogout}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard
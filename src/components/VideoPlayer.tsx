'use client'; // Add this line at the top of the file

import { useEffect, useState, useRef } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  id: string;
}

export function VideoPlayer({ id }: VideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const docRef = doc(db, "videos", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setVideoUrl(docSnap.data().url);
      } else {
        console.log("No such document!");
      }
    };

    fetchVideo();
  }, [id]);

  const enterFullScreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    }
  };

  if (!videoUrl) return <div>Loading...</div>;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black">
      <video 
        ref={videoRef}
        src={videoUrl} 
        controls 
        className="w-full h-full object-contain"
      >
        Your browser does not support the video tag.
      </video>
      <Button onClick={enterFullScreen} className="mt-4">Enter Full Screen</Button>
    </div>
  );
}
'use client';  // Add this line at the top of the file

import { useState, useCallback } from 'react';
import { storage, db } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Input } from "@/components/ui/input";

export function VideoUpload() {
  const [uploading, setUploading] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `videos/${file.name}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      const docRef = await addDoc(collection(db, "videos"), {
        name: file.name,
        url: downloadURL,
        timestamp: new Date()
      });

      setShareLink(`/watch/${docRef.id}`);
    } catch (error) {
      console.error("Error uploading video: ", error);
    } finally {
      setUploading(false);
    }
  }, []);

  return (
    <div className="space-y-4">
      <Input 
        type="file" 
        accept="video/*" 
        onChange={handleFileChange} 
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {shareLink && (
        <div>
          Share Link: <a href={shareLink} target="_blank" rel="noopener noreferrer">{shareLink}</a>
        </div>
      )}
    </div>
  );
}
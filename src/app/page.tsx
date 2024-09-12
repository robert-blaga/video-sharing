import dynamic from 'next/dynamic';

const VideoUpload = dynamic(() => import('@/components/VideoUpload').then(mod => mod.VideoUpload), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Video Sharing App</h1>
      <VideoUpload />
    </div>
  );
}

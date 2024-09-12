import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer').then(mod => mod.VideoPlayer), { ssr: false });

export default function WatchPage({ params }: { params: { id: string } }) {
  return <VideoPlayer id={params.id} />;
}
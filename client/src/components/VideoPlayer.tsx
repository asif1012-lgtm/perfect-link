import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  src?: string;
  autoplay?: boolean;
  className?: string;
}

export default function VideoPlayer({ 
  src = "https://cdn.glitch.global/cfdab748-b145-4b28-8f85-c26ac388a3c9/cookies.mp4?v=1719846896202", 
  autoplay = false,
  className = ""
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress || 0);
    }
  };

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-40 object-cover"
        src={src}
        muted={isMuted}
        autoPlay={autoplay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <div className="flex items-center justify-between text-white">
          <button
            onClick={togglePlay}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            type="button"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <div className="flex-1 mx-3">
            <div className="w-full bg-white/20 rounded-full h-1">
              <div 
                className="bg-facebook-blue h-1 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            onClick={toggleMute}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            type="button"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

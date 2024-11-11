import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }) => {
  // Verifica se a URL é válida e se precisa extrair o ID
  const videoId = videoUrl.includes("youtube.com") ? videoUrl.split('v=')[1] : videoUrl;

  return (
    <div className="video-player">
      <ReactPlayer 
        url={`https://www.youtube.com/watch?v=${videoId}`} 
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
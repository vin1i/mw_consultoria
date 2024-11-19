import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }) => {
  let videoId = videoUrl;

  // Verifica se a URL é do YouTube e extrai o ID
  if (videoUrl.includes("youtube.com")) {
    const match = videoUrl.match(/[?&]v=([^&]+)/);
    if (match && match[1]) {
      videoId = match[1];
    }
  }

  // Você pode adicionar outros suportes de URL aqui, se necessário
  // Exemplo para o Vimeo
  if (videoUrl.includes("vimeo.com")) {
    videoId = videoUrl.split('/').pop(); // Extrai o ID do Vimeo
  }

  return (
    <div className="video-player">
      <ReactPlayer 
        url={videoUrl.includes("youtube.com") ? `https://www.youtube.com/watch?v=${videoId}` : videoUrl} 
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;

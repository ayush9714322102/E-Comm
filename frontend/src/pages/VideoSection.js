import React from "react";

const VideoGallery = () => {
  const videos = [
    { src: "https://riyaasat.in/cdn/shop/videos/c/vp/ad10382470c44ea3876e427efd05be9f/ad10382470c44ea3876e427efd05be9f.HD-1080p-2.5Mbps-37351078.mp4?v=0", alt: "Video 1" },
    { src: "https://riyaasat.in/cdn/shop/videos/c/vp/976304b6c91e410b8b7ed73fbb2dd445/976304b6c91e410b8b7ed73fbb2dd445.HD-1080p-2.5Mbps-37351081.mp4?v=0", alt: "Video 2" },
    { src: "https://riyaasat.in/cdn/shop/videos/c/vp/d861f6e36ec94e4c9ad7cfb76c315112/d861f6e36ec94e4c9ad7cfb76c315112.HD-1080p-2.5Mbps-37351080.mp4?v=0", alt: "Video 3" },
    { src: "https://riyaasat.in/cdn/shop/videos/c/vp/c30075714af149ff96098bf21f9f0b21/c30075714af149ff96098bf21f9f0b21.HD-1080p-2.5Mbps-37351079.mp4?v=0", alt: "Video 4" },
  ];

  return (
    <div className="container mx-auto p-6 px-10 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="w-full overflow-hidden shadow-lg">
            <video
              src={video.src}
              className="w-full h-auto object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;

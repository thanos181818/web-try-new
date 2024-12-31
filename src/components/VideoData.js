import React from 'react';

const VideoData = ({ videoMetadata }) => {
  return (
    <div className="video-details">
      <h2>Video Details</h2>
      <p><strong>Video Name: </strong> {videoMetadata.video_name}</p>
      <p><strong>Is Fake: </strong> {videoMetadata.is_fake}</p>
      <p><strong>Fake Confidence: </strong> {videoMetadata.fake_confidence}</p>
      <p><strong>Source: </strong>{videoMetadata.source}</p>
    </div>
  );
};

export default VideoData;
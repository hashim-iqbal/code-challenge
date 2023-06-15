import React from "react";

import "./Video.css";

const Video = (props) => {
  const { url, title, thumbnail } = props;

  return (
    <div className="card video">
      <video
        width="300"
        height="200"
        controls
        src={url}
        poster={thumbnail}
        title={title}
        className="video-player"
      />

      <div className="card-body">
        {title}
      </div>
    </div>
  );
};

export default Video;

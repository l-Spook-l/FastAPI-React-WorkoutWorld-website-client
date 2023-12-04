import React from 'react'
import { Ratio } from 'react-bootstrap';
import style from './VideoPlayer.module.css'

const VideoPlayer = ({ videoUrl }) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div style={{ width: 580, height: 'auto' }}>
      <Ratio aspectRatio="16x9">
        <div dangerouslySetInnerHTML={{ __html: videoUrl }} />
      </Ratio>
    </div>
  )
}

export default VideoPlayer  
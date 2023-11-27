import React from 'react'
import { Ratio } from 'react-bootstrap';
import style from './VideoPlayer.module.css'

const VideoPlayer = ({ videoUrl }) => {
  // console.log('videoUrl', videoUrl)
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
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/rLSg9P0c6_Y?si=39brASYUjV2Z2F0M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
        <div dangerouslySetInnerHTML={{ __html: videoUrl }} />
      </Ratio>
    </div>
  )
}

export default VideoPlayer  
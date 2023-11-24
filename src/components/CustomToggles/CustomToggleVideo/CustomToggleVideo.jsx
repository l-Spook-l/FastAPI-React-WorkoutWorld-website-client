import React, { useContext, useState } from 'react'
import { Accordion } from 'react-bootstrap';
import style from './CustomToggleVideo.module.css'
import VideoPlayer from '../../VideoPlayer/VideoPlayer';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';

const CustomToggleVideo = observer(({ video, color }) => {
  const { user } = useContext(Context)

  const [status, setStatus] = useState(true)

  return (
    user.isAuth
    ?
    <Accordion bsPrefix='myAccordion'>
      <Accordion.Item eventKey="0">
        <Accordion.Header 
          onClick={() => setStatus(!status)} 
          bsPrefix='myAccordionHeader'>
          <span className={color === 'dark' ? style.accordionHeaderTextDark : style.accordionHeaderTextLight}>
            {status 
            ? 'View video'
            : 'Hide video'
            }
            </span>
        </Accordion.Header>
        <Accordion.Body bsPrefix='myAccordionBody' className={color === 'dark' ? style.accordionBodyDark : style.accordionBodyLight}>
          <VideoPlayer videoUrl={video} color='dark'/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    :
    <p className={color === 'dark' ? style.accordionHeaderTextDark : style.accordionHeaderTextLight}>Sign in to view the video.</p>
  )
})

export default CustomToggleVideo
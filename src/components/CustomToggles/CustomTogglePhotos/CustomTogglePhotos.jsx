import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap';
import style from './CustomTogglePhotos.module.css'
import ExerciseImageSlider from '../../Sliders/ExerciseImageSlider/ExerciseImageSlider';

const CustomTogglePhotos = ({ color, photos }) => {

  const [statusViewPhotos, setStatusViewPhotos] = useState(true)

  return (
    <Accordion bsPrefix='myAccordion' className={style.accordionDark}>
      <Accordion.Item eventKey="1">
        <Accordion.Header bsPrefix='myAccordionHeader' onClick={() => setStatusViewPhotos(!statusViewPhotos)} >
        <span className={color === 'dark' ? style.accordionHeaderTextDark : style.accordionHeaderTextLight}>
            {statusViewPhotos 
            ? 'View photos'
            : 'Hide photos'
            }
          </span>
        </Accordion.Header>
        <Accordion.Body bsPrefix='myAccordionBody' 
        className={color === 'dark' ? style.accordionBodyDark : style.accordionBodyLight}>
          <ExerciseImageSlider photos={photos}/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default CustomTogglePhotos
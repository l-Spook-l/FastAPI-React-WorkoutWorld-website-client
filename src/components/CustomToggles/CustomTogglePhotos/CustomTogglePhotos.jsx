import React, { useContext, useState } from 'react'
import { Accordion } from 'react-bootstrap';
import style from './CustomTogglePhotos.module.css'
import ExerciseImageSlider from '../../Sliders/ExerciseImageSlider/ExerciseImageSlider';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';

const CustomTogglePhotos = observer(({ color, photos }) => {
  const { user } = useContext(Context)

  const [statusViewPhotos, setStatusViewPhotos] = useState(true)

  return (
    user.isAuth 
    ? 
    <Accordion bsPrefix='myAccordion' className={!statusViewPhotos && style.accordionDarkOpen}>
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
    :
    <p className={color === 'dark' ? style.accordionHeaderTextDark : style.accordionHeaderTextLight}>Sign in to view the photos</p>
  )
})

export default CustomTogglePhotos
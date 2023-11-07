import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap';
import style from './CustomToggleDescription.module.css'

const CustomToggleDescription = ({ body, color }) => {

  const [status, setStatus] = useState(true)

  return (
    <Accordion bsPrefix='myAccordion'>
      <Accordion.Item eventKey="0">
        <Accordion.Header 
          onClick={() => setStatus(!status)} 
          bsPrefix='myAccordionHeader' 
          className={style.accordionHeader}>
          <span className={color === 'dark' ? style.accordionHeaderTextDark : style.accordionHeaderTextLight}>
            {status 
            ? 'View the description'
            : 'Hide the description'
            }:
            </span>
        </Accordion.Header>
        <Accordion.Body bsPrefix='myAccordionBody' className={color === 'dark' ? style.accordionBodyDark : style.accordionBodyLight}>
          {body}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default CustomToggleDescription
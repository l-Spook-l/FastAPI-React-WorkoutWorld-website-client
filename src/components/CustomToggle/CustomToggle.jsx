import React from 'react'
import { Accordion } from 'react-bootstrap';
import style from './CustomToggle.module.css'

const CustomToggle = ({ header, body }) => {

  return (
    <Accordion bsPrefix='myAccordion'>
      <Accordion.Item eventKey="0">
        <Accordion.Header bsPrefix='myAccordionHeader' className={style.accordionHeader}>
          <span className={style.accordionHeaderText}>{header}:</span>
        </Accordion.Header>
        <Accordion.Body bsPrefix='myAccordionBody' className={style.accordionBody}>
          {body}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default CustomToggle
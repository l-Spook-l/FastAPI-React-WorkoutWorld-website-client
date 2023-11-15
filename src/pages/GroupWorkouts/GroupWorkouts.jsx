import React from 'react'
import style from './GroupWorkouts.module.css'
import { Container } from 'react-bootstrap'

const GroupWorkouts = () => {
  return (
    <div className={style.mainBlock}>
      <Container className={style.container}>
        <p className={style.text}>At the moment, enrollment for fitness groups is not available. Register and enable notifications to stay informed about our updates!</p>
      </Container>
    </div>
  )
}

export default GroupWorkouts
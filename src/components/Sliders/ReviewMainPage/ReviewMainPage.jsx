import React from 'react'
import { Carousel } from 'react-bootstrap'
import style from './ReviewMainPage.module.css'

const ReviewMainPage = () => {
  return (
    <Carousel>
      <Carousel.Item className={style.carouselItem}>
        <p className={style.text}>
          I absolutely love WorkoutWorld! Their wide range of sports goods and 
          expertly designed workouts have helped me achieve my fitness goals. 
        </p>
        - Olivia
      </Carousel.Item>
      <Carousel.Item className={style.carouselItem}>
        <p className={style.text}>
          WorkoutWorld is the best place to get everything you need for a 
          great workout! Their knowledgeable staff helped me create a personalized 
          workout plan and their sports goods store has everything I need to stay active. 
          Thank you WorkoutWorld!
        </p>
        - Emily
      </Carousel.Item>
      <Carousel.Item className={style.carouselItem}>
        <p className={style.text}>
          I'm so grateful for WorkoutWorld! Their incredible workout creation and 
          wide range of sports goods have helped me achieve my fitness goals. 
          The knowledgeable staff provided excellent guidance, making my fitness 
          journey enjoyable and successful. Thank you WorkoutWorld!
        </p>
        - John 
      </Carousel.Item>
    </Carousel>
  )
}

export default ReviewMainPage
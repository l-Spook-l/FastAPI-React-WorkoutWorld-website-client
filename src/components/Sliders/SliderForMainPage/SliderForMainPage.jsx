import React from 'react'
import { Carousel } from 'react-bootstrap'
import style from "./SliderForMainPage.module.css"
import sliderCalisthenics from '../../../assets/main page 1.png'
import sliderSki from '../../../assets/main page 2.png'


const SliderForMainPage = () => {
  return (
    <Carousel>
      <Carousel.Item className={style.carouselItem}>
      <img className={style.carouselImage} src={sliderCalisthenics} alt="Ski"/>
        <Carousel.Caption>
          <h2 className={style.titleOnSlider}>Achieve Your Fitness Goals</h2>
          <h4>Get in shape and stay healthy with our expertly designed workouts and high-quality sports goods.</h4>
          {/* <NavLink to={`${BRAND_ROUTE}/callaway-golf`} className={style.buttonOnCarousel}>Learn More</NavLink> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className={style.carouselItem}>
      <img className={style.carouselImage} src={sliderSki} alt="Ski"/>
        <Carousel.Caption>
          <h2 className={style.titleOnSlider}>Achieve Your Fitness Goals</h2>
          <h4>Get in shape and stay healthy with our expertly designed workouts and high-quality sports goods.</h4>
          {/* <NavLink to={`${BRAND_ROUTE}/callaway-golf`} className={style.buttonOnCarousel}>Learn More</NavLink> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default SliderForMainPage
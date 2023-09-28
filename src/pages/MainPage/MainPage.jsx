import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SliderForMainPage from '../../components/Sliders/SliderForMainPage/SliderForMainPage';
import { Container, Image } from 'react-bootstrap';
import style from './MainPage.module.css'
import imgAboutUs from '../../assets/about us.png'
import imgPersonalWorkouts from '../../assets/personal workouts.png'
import imgGroupWorkouts from '../../assets/group workouts.png'
import imgSportsGoodsStore from '../../assets/store goods.png'
import imgHomeGym from '../../assets/home gym.png'
import ReviewMainPage from '../../components/Sliders/ReviewMainPage/ReviewMainPage';

const MainPage = observer(() => {

  const navigate = useNavigate();

  // useEffect(() => {

  // },[])

  return (
    <div>
      <SliderForMainPage />
      <Container fluid>
        <div className={style.sectionAboutUs}>
          <Image className={style.imgAboutUs} src={imgAboutUs}/>
          <div className={style.textAboutUs}>
            <h3>About us</h3>
            <p>
              Welcome to WorkoutWorld, your ultimate destination for all things workouts and sports goods in Ukraine. 
              We are passionate about helping you achieve your fitness goals and providing you with top-quality 
              products to enhance your athletic performance.
              At WorkoutWorld, we specialize in workout creation, offering personalized fitness plans tailored to your unique needs and preferences. 
              Whether you are a beginner or a seasoned athlete, our experienced team is here to guide and support you every step of the way. 
              With our wide range of sports goods available, you can find everything you need to elevate your workouts and 
              take your performance to the next level. 
              Join us on this fitness journey and let's make every workout count!
            </p>
          </div>
        </div>
        <div >
          <h3>Services</h3>
          <div className={style.sectionServices}>
            <div>
              <Image className={style.imgServices} src={imgPersonalWorkouts}/>
              <p></p>
            </div>
            <div>
              <Image className={style.imgServices} src={imgGroupWorkouts}/>
              <p></p>
            </div>
            <div>
              <Image className={style.imgServices} src={imgSportsGoodsStore}/>
              <p></p>
            </div>
          </div>
          
        </div>
        <div className={style.sectionFitnessEquipment}>
          <div className={style.textAboutUs}>
            <h3>Fitness Equipment Sales</h3>
            <p>
              Get the best quality sports goods and fitness equipment for your workouts at our store. 
              We offer a wide range of products to meet all your fitness needs, from weights and 
              resistance bands to treadmills and exercise bikes. 
              Visit our store today and start building your dream home gym.
            </p>
          </div>
          <Image className={style.imgHomeGym} src={imgHomeGym}/>
        </div>
        <div className={style.sectionReviews}>
          <ReviewMainPage/>
        </div>
        <div className={style.sectionContacts}></div>
      </Container>
    </div>
  )
})

export default MainPage
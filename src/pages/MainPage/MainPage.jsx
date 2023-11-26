import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import SliderForMainPage from '../../components/Sliders/SliderForMainPage/SliderForMainPage';
import { Container, Image } from 'react-bootstrap';
import style from './MainPage.module.css'
import imgAboutUs from '../../assets/about us.png'
import imgPersonalWorkouts from '../../assets/personal workouts.png'
import imgGroupWorkouts from '../../assets/group workouts.png'
import imgSportsGoodsStore from '../../assets/store goods.png'
import imgHomeGym from '../../assets/home gym.png'
import ReviewMainPage from '../../components/Sliders/ReviewMainPage/ReviewMainPage';
import MainPageContactForm from '../../components/Forms/MainPageContactForm/MainPageContactForm';
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { GROUP_WORKOUTS_ROUTE, SHOP_ROUTE, WORKOUTS_ROUTE } from '../../utils/consts';

const MainPage = observer(() => {

  useEffect(() => {
   window.scrollTo(0, 0);
  },[])

  return (
    <div>
      <SliderForMainPage />
      <Container fluid className={style.container}>
        <div className={style.sectionAboutUs}>
          <Image className={style.imgAboutUs} src={imgAboutUs}/>
          <div className={style.textAboutUs}>
            <h2>About us</h2>
            <p>
              Welcome to WorkoutWorld, your ultimate destination for all things workouts and sports goods in Ukraine. 
              We are passionate about helping you achieve your fitness goals and providing you with top-quality 
              products to enhance your athletic performance.
            </p>
            <p>
              At WorkoutWorld, we specialize in workout creation, offering personalized fitness plans tailored to your unique needs and preferences. 
              Whether you are a beginner or a seasoned athlete, our experienced team is here to guide and support you every step of the way. 
              With our wide range of sports goods available, you can find everything you need to elevate your workouts and 
              take your performance to the next level. 
              Join us on this fitness journey and let's make every workout count!
            </p>
          </div>
        </div>
        <div className={style.sectionServices}>
          <h2 className={style.titleServices}>Services</h2>
          <div className={style.contentServices}>
            <NavLink className={style.imgContainer} to={WORKOUTS_ROUTE}>
              <Image className={style.imgServices} src={imgPersonalWorkouts}/>
              <div className={style.overlay}>
                <h3 className={style.textOnImgServices}>Personalized Workout Programs</h3>
                <p className={style.textOnImgServices}>
                  Achieve your fitness goals with custom-designed workout plans tailored to your needs.
                </p>
              </div>
            </NavLink>
            <NavLink className={style.imgContainer} to={GROUP_WORKOUTS_ROUTE}>
              <Image className={style.imgServices} src={imgGroupWorkouts}/>
              <div className={style.overlay}>
                <h3 className={style.textOnImgServices}>Group Fitness Classes</h3>
                <p className={style.textOnImgServices}>
                  Join our energetic and motivating group classes for a fun and effective workout experience.
                </p>
              </div>
            </NavLink>
            <NavLink className={style.imgContainer} to={SHOP_ROUTE}>
              <Image className={style.imgServices} src={imgSportsGoodsStore}/>
              <div className={style.overlay}>
                <h3 className={style.textOnImgServices}>Sports Goods Store</h3>
                <p className={style.textOnImgServices}>
                  Discover a wide range of high-quality sports goods and equipment at our store.
                </p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={style.sectionFitnessEquipment}>
          <div className={style.textFitnessEquipment}>
            <NavLink className={style.fitnessEquipmentTitle} to={SHOP_ROUTE}>Fitness Equipment Sales</NavLink>
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
        <div className={style.sectionContacts}>
          <div className={style.textContact}>
            <h3>Connect with Us</h3>
            <p >
              Have a question or want to learn more about our workouts and sports goods? 
              Fill out the contact form below and we'll get back to you as soon as possible!
            </p>
            <div className={style.social}>
              <FaFacebookF/>
              <FaTwitter/>
              <FaInstagram/>
            </div>
          </div>
          <div className={style.contactForm}><MainPageContactForm/></div>
        </div>
      </Container>
    </div>
  )
})

export default MainPage
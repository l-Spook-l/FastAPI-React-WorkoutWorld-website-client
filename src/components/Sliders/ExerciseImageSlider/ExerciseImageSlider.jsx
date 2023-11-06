import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import { Image } from "react-bootstrap";
import style from "./ExerciseImageSlider.module.css";


const ExerciseImageSlider = ({ photos, onSelect }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: photos.length > 4 ? 4 : photos.length,
    slidesToScroll: 1,
    arrows: true,
  };
  // Передаем выбранное фото обратно в родительский компонент
  const handleSelectPhoto = (index) => {
    // onSelect(index);
    console.log('change photo')
  };
  console.log('change photo', photos)

  return (
    <div>
      <Slider {...settings} className={style.mySlider}>
        {photos.map((photo, index) => (
          <div key={index}>
            <Image
              onClick={() => handleSelectPhoto(index)}
              className={style.selectPhoto}
              src={process.env.REACT_APP_API_URL + photo.photo}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ExerciseImageSlider;

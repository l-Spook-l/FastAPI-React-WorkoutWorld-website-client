import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import { Image } from "react-bootstrap";
import style from "./ExerciseImageSlider.module.css";
import PhotoModal from "../../Modals/PhotoModal/PhotoModal";


const ExerciseImageSlider = ({ photos, onSelect }) => {
  const [showModalPhoto, setShowModalPhoto] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: photos.length > 4 ? 4 : photos.length,
    slidesToScroll: 1,
    arrows: true,
  };

  // console.log('change photo', photos)

  const selectPhoto = (image) => {
    setSelectedPhoto(image);
    setShowModalPhoto(true);
  }

  const handleCloseModalPhoto = () => {
    setShowModalPhoto(false);
  }

  return (
    <div>
      <Slider {...settings} className={style.mySlider}>
        {photos.map((photo, index) => (
          <div key={index}>
            <Image
              onClick={() => selectPhoto(photo.photo)}
              className={style.selectPhoto}
              src={process.env.REACT_APP_API_URL + photo.photo}
            />
          </div>
        ))}
      </Slider>
      {showModalPhoto && (
        <PhotoModal image={selectedPhoto} onClose={handleCloseModalPhoto} />
      )}
    </div>
  );
};

export default ExerciseImageSlider;

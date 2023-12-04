import React from "react";
import style from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={style.container}>
      <p className="text-center">
        &copy; 2023 WorkoutWorld. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer;

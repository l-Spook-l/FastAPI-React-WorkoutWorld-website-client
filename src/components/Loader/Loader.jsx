import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import style from './Loader.module.css'

const Loader = () => {
  return (
    <>      
        <div className={style.loaderOverlay}>
          <Spinner animation="border" variant="light" />
        </div>
    </>
  )
}

export default Loader;

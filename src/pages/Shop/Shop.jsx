import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { AiFillSetting } from 'react-icons/ai';
import style from './Shop.module.css'

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
   },[])

  return (
    <Container className={style.container}>
      <p className={style.setIcon}><AiFillSetting/></p>
      <h1>The store is under development.</h1>
      <p>
      Our store is in the development stage. Register to receive notifications about the store's launch!
      </p>
  </Container>
  )
}

export default Shop
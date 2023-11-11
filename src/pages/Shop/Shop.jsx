import React from 'react'
import { Container, Button } from 'react-bootstrap';
import { AiFillSetting } from 'react-icons/ai';
import style from './Shop.module.css'

const Shop = () => {
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
import React from 'react'
import style from "./Page404.module.css"

const Page404 = () => {
  return (
    <div className={style.container}>
      <h1 className={style.heading}>Oops! 404 Error</h1>
      <p className={style.text}>
        We can't seem to find the page you're looking for.
      </p>
    </div>
  )
}

export default Page404
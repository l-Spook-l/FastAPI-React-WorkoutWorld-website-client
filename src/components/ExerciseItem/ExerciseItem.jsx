import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../..'
import style from './ExerciseItem.module.css'

const ExerciseInfo = observer(({ exercise, sets }) => {
  const {user} = useContext(Context)

  return (
    <div className={style.container}>
      <p>{exercise.name}</p>
      <p>{exercise.description}</p>
      <div className={style.exerciseSection}>
        <div className={style.exerciseTitle}>
          <div>
            <p>Sets</p>
            <p>{exercise.number_of_sets}</p>
          </div>
          <div>
            <p>Repetitions</p>
            <p>{exercise.maximum_repetitions}</p>
          </div>
          <div>
            <p>Rest time</p>
            <p>{exercise.rest_time}</p>
          </div>
        </div>
        <div className={style.setSection}>
          {sets.map((set) => 
            <div  key={set.Set.id}>
              <p>{set.Set.count}</p>
              <p>{set.Set.weight}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default ExerciseInfo
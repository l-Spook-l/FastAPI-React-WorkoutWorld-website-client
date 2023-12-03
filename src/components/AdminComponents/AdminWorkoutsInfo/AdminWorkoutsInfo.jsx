import React from 'react'
import style from './AdminWorkoutsInfo.module.css'

const AdminWorkoutsInfo = ({dataWorkouts}) => {

  return (
    <table>
      <thead>
        <tr className={style.workoutNav}>
          <th className={style.columnId}>id</th>
          <th className={style.columnName}>name</th>
          <th className={style.columnUserId}>user id</th>
          <th className={style.columnTimeCreate}>created</th>
          <th className={style.columnDifficulty}>difficulty</th>
          <th className={style.columnDescription}>description</th>
          <th className={style.columnStatus}>status</th>
        </tr>
      </thead>
      <tbody>
        {dataWorkouts.data_workouts.map((workout) => 
          <tr key={workout.Workout.id} className={style.workoutInfo}>
            <td className={style.columnId}>{workout.Workout.id}</td>
            <td className={style.columnName}>{workout.Workout.name}</td>
            <td className={style.columnUserId}>{workout.Workout.user_id}</td>
            <td className={style.columnTimeCreate}>{workout.Workout.created_at}</td>
            <td className={style.columnDifficulty}>{workout.Workout.difficulty}</td>
            <td className={style.columnDescription}>{workout.Workout.description}</td>
            <td className={style.columnStatus}>{workout.Workout.is_public ? 'True' : 'False'}</td>
          </tr>
        )}
      </tbody>
  </table>
  )
}

export default AdminWorkoutsInfo
import React from 'react'
import style from './AdminRolesInfo.module.css'

const AdminRolesInfo = ({dataRoles}) => {

  return (
    <table>
      <thead>
        <tr className={style.roleNav}>
          <th className={style.columnId}>id</th>
          <th className={style.columnName}>name</th>
        </tr>
      </thead>
    <tbody>
      {dataRoles.map((role) => 
        <tr key={role.Role.id} className={style.roleInfo}>
          <td className={style.columnId}>{role.Role.id}</td>
          <td className={style.columnName}>{role.Role.name}</td>
        </tr>
      )}
    </tbody>
  </table>
  )
}

export default AdminRolesInfo
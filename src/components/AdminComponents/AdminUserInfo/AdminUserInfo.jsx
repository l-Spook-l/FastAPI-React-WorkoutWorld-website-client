import React from 'react'
import style from './AdminUserInfo.module.css'

const AdminUserInfo = ({dataUsers}) => {

  console.log('data users', dataUsers.data_users)

  return (
    <table>
      <thead>
        <tr className={style.userNav}>
          <th className={style.columnId}>id</th>
          <th className={style.columnFirstName}>first_name</th>
          <th className={style.columnLastName}>last_name</th>
          <th className={style.columnEmail}>email</th>
          <th className={style.columnPhone}>phone</th>
          <th className={style.columnRegister}>registered_at</th>
          <th className={style.columnRole}>role_id</th>
          <th className={style.columnUsername}>username</th>
          <th className={style.columnIsActive}>is_active</th>
          <th className={style.columnIsSuperuser}>is_superuser</th>
        </tr>
      </thead>
    <tbody>
      {dataUsers.data_users.map((user) => 
        <tr key={user.User.id} className={style.userInfo}>
          <td className={style.columnId}>{user.User.id}</td>
          <td className={style.columnFirstName}>{user.User.first_name}</td>
          <td className={style.columnLastName}>{user.User.last_name}</td>
          <td className={style.columnEmail}>{user.User.email}</td>
          <td className={style.columnPhone}>{user.User.phone}</td>
          <td className={style.columnRegister}>{user.User.registered_at}</td>
          <td className={style.columnRole}>{user.User.role_id}</td>
          <td className={style.columnUsername}>{user.User.username}</td>
          <td className={style.columnIsActive}>{user.User.is_active}</td>
          <td className={style.columnIsSuperuser}>{user.User.is_superuser}</td>
        </tr>
      )}
    </tbody>

  </table>
  )
}

export default AdminUserInfo
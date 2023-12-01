import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './stores/UserStore'
import WorkoutStore from './stores/WorkoutStore';


// Создаем глобальную перевенную, это будет обьект, 
// который будет доступен компонентам на все уровнях вложенности
// с помощью хука useContext
// В любом компоненте можно их вызвать так
// const {user} = useContext(Context)
// const {product} = useContext(Context)
export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider
  // value - обьект который нам нужно сделать глобальным
  // их и вызываем с помощью хука useContext
    value={{
      user: new UserStore(),
      workout: new WorkoutStore(),
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
)

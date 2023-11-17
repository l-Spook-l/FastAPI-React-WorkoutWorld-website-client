import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../../..";
import { Dropdown, Form, Image } from "react-bootstrap";
import style from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { WORKOUT_ROUTE } from "../../../utils/consts";
import { AiOutlineClose } from "react-icons/ai";
import { fetchAddUserWorkout, fetchMyWorkouts, fetchWorkouts } from "../../../http/workoutAPI";

const SearchBar = observer(({ typeWorkout, statusWorkout=undefined }) => {
  const { workout } = useContext(Context)
  const { user } = useContext(Context)

  const navigate = useNavigate()

  useEffect(() => {
    switch(typeWorkout) {
      case "All":
        fetchWorkouts(
          null,
          null,
          null,
          workout.selectedSearchWorkouts
        ).then((data) => {
          workout.setSearchWorkouts(data)
        })
        break
      case "Created":
        fetchMyWorkouts(
          user.user.id,
          workout.selectedSearchWorkouts,
          null,
          null,
          null,
          statusWorkout,
        ).then((data) => {
          workout.setSearchWorkouts(data)
        })
        break
      case "Added":
        fetchAddUserWorkout(
          user.user.id,
          workout.selectedSearchWorkouts,
          null,
          null,
          null,
        ).then((data) => {
          workout.setSearchWorkouts(data)
        })
        break
    }
  }, [statusWorkout, workout.selectedSearchWorkouts])

  const clearSearch = () => {
    workout.setSelectedSearchWorkouts("")
  };

  return (
    <Dropdown className={style.myDropdown}>
      <Dropdown.Toggle
        bsPrefix="my-dropdown-toggle"
        className={style.myDropdownToggle}
      >
        <div className="d-flex">
          <Form.Control
            type="text"
            className={style.myInput}
            placeholder="Enter workout name"
            value={workout.selectedSearchWorkouts}
            onChange={(e) => workout.setSelectedSearchWorkouts(e.target.value)}
          />
          {workout.selectedSearchWorkouts.length > 0 && (
            <div className={style.clearSearch} onClick={() => clearSearch()}>
              <AiOutlineClose />
            </div>
          )}
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className={style.dropdownMenu}>
        {workout.searchWorkouts.length !== 0 
        ? (workout.searchWorkouts.length > 4 
          ? (workout.searchWorkouts.data.map((workoutItem) => (
              <Dropdown.Item
              bsPrefix="myDropdownItem"
              className={style.myDropdownItem}
                key={workoutItem.Workout.id}
                onClick={() => navigate(`${WORKOUT_ROUTE}/${workoutItem.Workout.id}`)}
              >
                <div className={style.workoutItem}>
                  {workoutItem.Workout.name}
                </div>
              </Dropdown.Item>
            ))
          ) : (
            workout.searchWorkouts.data
              .slice(0, workout.searchWorkouts.length)
              .map((workoutItem) => (
                <Dropdown.Item
                bsPrefix="myDropdownItem"
                className={style.myDropdownItem}
                  key={workoutItem.Workout.id}
                  onClick={() =>
                    navigate(`${WORKOUT_ROUTE}/${workoutItem.Workout.id}`)
                  }
                >
                  <div className={style.workoutItem}>
                      {workoutItem.Workout.name}
                  </div>
                </Dropdown.Item>
              ))
          )
        ) : (
          <div className="p-1">
            No results found for your query. Please refine your search
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default SearchBar;

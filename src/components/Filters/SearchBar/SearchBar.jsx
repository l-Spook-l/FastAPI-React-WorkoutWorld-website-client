import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../../..";
import { Dropdown, Form, Image } from "react-bootstrap";
import style from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { WORKOUT_ROUTE } from "../../../utils/consts";
import { AiOutlineClose } from "react-icons/ai";
import { fetchWorkouts } from "../../../http/workoutAPI";

const SearchBar = observer(() => {
  const { workout } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkouts(
      null,
      null,
      null,
      1,
      null,
      null,
      null,
      workout.selectedSearchWorkouts
    ).then((data) => {
      workout.setSearchWorkouts(data.results);
    });
  }, [workout.selectedSearchWorkouts]);

  const clearSearch = () => {
    workout.setSelectedSearchWorkouts("");
  };

  console.log('searchWorkouts', workout.searchWorkouts)
  console.log('selectedSearchWorkouts', workout.selectedSearchWorkouts)

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
            placeholder="Enter the product name"
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
        {workout.searchWorkouts.length !== 0 ? (
          workout.searchWorkouts.length > 4 ? (
            workout.searchWorkouts.map((workoutItem) => (
              <Dropdown.Item
                key={workoutItem.id}
                onClick={() => navigate(`${WORKOUT_ROUTE}/${workoutItem.id}`)}
              >
                <div>
                  {/* <Image
                    className={style.image}
                    src={process.env.REACT_APP_API_URL + photos[0].photo}
                  /> */}
                  {workoutItem.name}
                </div>
              </Dropdown.Item>
            ))
          ) : (
            workout.searchWorkouts
              .slice(0, workout.searchWorkouts.length)
              .map((workoutItem) => (
                <Dropdown.Item
                  key={workoutItem.id}
                  onClick={() =>
                    navigate(`${WORKOUT_ROUTE}/${workoutItem.id}`)
                  }
                >
                  <div>
                    {/* <Image
                      className={style.image}
                      src={process.env.REACT_APP_API_URL + photos[0].photo}
                    /> */}
                    {workoutItem.name}
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

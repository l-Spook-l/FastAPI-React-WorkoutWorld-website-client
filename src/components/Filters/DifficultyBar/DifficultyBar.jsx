import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../../../index";
import { Accordion } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import style from "./DifficultyBar.module.css";

const DifficultyBar = observer(() => {
  const { workout } = useContext(Context);

  const [show, setShow] = useState(true);

  return (
    <Accordion bsPrefix="my-accordion" className={style.accordion}>
      <Accordion.Item bsPrefix="my-accordionItem" eventKey="0">
        <Accordion.Header bsPrefix="my-accordionHeader" onClick={() => setShow(!show)}>
          <span className={style.accordionHeader}>Difficulties</span>
          <span className={style.arrow}>
            {show ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </span>
        </Accordion.Header>
        <Accordion.Body bsPrefix="my-accordionBody" className={style.accordionBody}>
          {workout.difficulties.data.map((difficulty) => 
            <div key={difficulty.DifficultyWorkout.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input me-3"
                checked={workout.selectedDifficulty.includes(difficulty)}
                onChange={() => workout.setSelectedDifficulty(difficulty)}
              />
              <label
                className={style.labelCheck}
                onClick={() => workout.setSelectedDifficulty(difficulty)}
              >
                {difficulty.DifficultyWorkout.difficulty}
              </label>
            </div>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
});

export default DifficultyBar;

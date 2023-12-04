import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Accordion } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import style from "./IsPublicBar.module.css";
import { Context } from "../../..";

const IsPublicBar = observer(({ statusWorkout }) => {
  const { workout } = useContext(Context)

  const [show, setShow] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState()

  const statusWorkoutList = [
    {
      id: 1,
      status: 'Public',
      value: true
    },
    {
      id: 2,
      status: 'Non-public',
      value: false
    },
  ]

  const statusChange = (status) => {
    workout.setPage(1)
    workout.setSkip(0)
    if (selectedStatus === status.id) {
      setSelectedStatus()
      statusWorkout()
    } else {
      setSelectedStatus(status.id)
      statusWorkout(status.value)
    }
  }

  return (
    <Accordion bsPrefix="my-accordion" className={style.accordion}>
      <Accordion.Item bsPrefix="my-accordionItem" eventKey="0">
        <Accordion.Header bsPrefix="my-accordionHeader" onClick={() => setShow(!show)}>
          <span className={style.accordionHeader}>Public</span>
          <span className={style.arrow}>
            {show ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </span>
        </Accordion.Header>
        <Accordion.Body bsPrefix="my-accordionBody" className={style.accordionBody}>
          {statusWorkoutList.map((status) => 
            <div key={status.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input me-3"
                checked={selectedStatus === status.id}
                onChange={() => statusChange(status)}
              />
              <label
                className={style.labelCheck}
                onClick={() => statusChange(status)}
              >
                {status.status}
              </label>
            </div>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
});

export default IsPublicBar;

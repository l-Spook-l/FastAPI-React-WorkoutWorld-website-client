import React from "react";
import { Offcanvas } from "react-bootstrap";
import SearchBar from "../Filters/SearchBar/SearchBar";
import DifficultyBar from "../Filters/DifficultyBar/DifficultyBar";

const MyOffcanvasFilters = ({ showOffcanvas, setShowOffcanvas, typeWorkout, statusWorkout }) => {

  const offcanvasClose = () => {
    setShowOffcanvas(false)
  }

  return (
    <>
      <Offcanvas show={showOffcanvas} onHide={offcanvasClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SearchBar typeWorkout={typeWorkout} statusWorkout={statusWorkout}/>
          <DifficultyBar/> 
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default MyOffcanvasFilters

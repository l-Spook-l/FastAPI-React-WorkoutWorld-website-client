import React from "react";
import { Offcanvas } from "react-bootstrap";
import SearchBar from "../Filters/SearchBar/SearchBar";
import DifficultyBar from "../Filters/DifficultyBar/DifficultyBar";

// Выпадающие меню для фильтров
const MyOffcanvasFilters = ({ showOffcanvas, setShowOffcanvas }) => {

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
          <SearchBar typeWorkout='All'/>
          <DifficultyBar/> 
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default MyOffcanvasFilters

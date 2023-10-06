import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import style from "./MyPagination.module.css";
import { Context } from "../..";

const MyPagination = observer(() => {
  const { workout } = useContext(Context);

  const pagesCount = Math.ceil(workout.totalCount / workout.limit);
  let pages = [];

  const selectPage = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    workout.setPage(page);
    workout.setSkip(workout.limit * (page - 1))
  };

  if (pagesCount <= 8 ) {
    for (let i = 0; i < pagesCount; i++) {
      pages.push(i + 1);
    }
  } else {
    if (workout.page === 1) { 
      pages = [1, 2, '...', pagesCount] 
    } else if (workout.page === pagesCount) {
      pages = [1, '...', pagesCount - 1, pagesCount]
    } else if (workout.page === 2 ) {
      pages = [1, 2, 3, '...', pagesCount]
    } else if (workout.page === (pagesCount - 1)) {
      pages = [1, '...', pagesCount - 2, pagesCount - 1, pagesCount]
    } else if (workout.page === 3) {
      pages = [1, 2, 3, 4, '...', pagesCount]
    } else if (workout.page === (pagesCount - 2)) {
      pages = [1, '...', pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount]
    } else {
      pages = [1, '...', workout.page - 1, workout.page, workout.page + 1, '...', pagesCount]
    }
  }

  return (
    <div className={style.container}>
      {pages.map((page, index) => (
        <button
          key={index}
          disabled={page === "..."}
          onClick={() => selectPage(page)}
          className={`${style.button} ${
            page === workout.page || page === "..."
            ? style.buttonActive 
            : style.buttonInactive
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
});

export default MyPagination;

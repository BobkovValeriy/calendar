import { useState } from "react";
import "./App.css";

function Day({ newDay, isWork, setMonthArray, setMonthChanges }) {
  const numberOfDay = newDay.getDate();
  const dayOfWeek = newDay.getDay();
  const daysOfWeekNames = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  const dayName = daysOfWeekNames[dayOfWeek];
  const [showButtons, setShowButtons] = useState(false);
  function addWorkDay() {
    setMonthArray((prevMonthArray) => {
      const updatedArray = prevMonthArray.map((prevMonth) =>
        prevMonth.firstDay.getMonth() === newDay.getMonth()
          ? {
              ...prevMonth,
              workDays: [...prevMonth.workDays, numberOfDay],
            }
          : prevMonth
      );

      // Обновляем только соответствующий месяц в monthChanges
      setMonthChanges(newDay.getMonth());
      return updatedArray;
    });
  }

  function removeWorkDay() {
    setMonthArray((prevMonthArray) => {
      const updatedArray = prevMonthArray.map((prevMonth) =>
        prevMonth.firstDay.getMonth() === newDay.getMonth()
          ? {
              ...prevMonth,
              workDays: prevMonth.workDays.filter(
                (day) => day !== newDay.getDate()
              ),
            }
          : prevMonth
      );

      // Обновляем только соответствующий месяц в monthChanges
      setMonthChanges(newDay.getMonth());

      return updatedArray;
    });
  }

  function showButton() {
    setShowButtons(true);
  }
  function hideButton() {
    setShowButtons(false);
  }
  return (
    <div
      className="day"
      style={isWork === "work" ? { backgroundColor: "red" } : {}}
      onMouseOver={showButton}
      onMouseLeave={hideButton}
    >
      <div>{dayName}</div>
      <div>{numberOfDay}</div>
      {showButtons && isWork === "non-work" ? (
        <button type="" className="add-work-day" onClick={addWorkDay}>
          Work!
        </button>
      ) : null}
      {showButtons && isWork === "work" ? (
        <button type="" className="remove-work-day" onClick={removeWorkDay}>
          Don't work!
        </button>
      ) : null}
    </div>
  );
}

export default Day;

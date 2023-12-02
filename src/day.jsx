import { useState } from "react";
import "./App.css";

function Day({ newDay, isWork }) {
  let [work, setWork] = useState(isWork);
  const numberOfDay = newDay.getDate();
  const dayOfWeek = newDay.getDay();
  const daysOfWeekNames = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  const dayName = daysOfWeekNames[dayOfWeek];
  const [showButtons, setShowButtons] = useState(false);
  function weWork() {
    setWork("work");
  }
  function removeWork() {
    setWork("");
  }
  function showButton() {
    setShowButtons(true);
  }
  function hideButton() {
    setShowButtons(false);
  }
  function showData() {
    console.log(newDay);
  }
  return (
    <div
      className="day"
      style={work ? { backgroundColor: "red" } : {}}
      onMouseOver={showButton}
      onMouseLeave={hideButton}
      onClick={showData}
    >
      <div>{dayName}</div>
      <div>{numberOfDay}</div>
      {showButtons && !work ? (
        <button type="" className="addWork" onClick={weWork}>
          Work!
        </button>
      ) : null}
      {showButtons && work ? (
        <button type="" className="removeWork" onClick={removeWork}>
          Don't work!
        </button>
      ) : null}
    </div>
  );
}

export default Day;

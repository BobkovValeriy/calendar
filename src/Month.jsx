import "./App.css";
import Day from "./day.jsx";

function Month({
  monthData,
  currentDayYear,
  setMonthArray,
  // setChanges,
  setMonthChanges,
}) {
  const startDay = new Date(2024, 2, 2);
  const currentDayMonth = monthData.lastDay.getMonth();
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  function isWorkDay(day, startDay) {
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    let dayDiff = Math.floor((day - startDay) / millisecondsInDay);

    dayDiff = ((dayDiff % 4) + 4) % 4;

    if (dayDiff === 0) {
      // console.log(day, "graphick");
      return "work";
    } else if (
      Array.isArray(monthData.workDays) &&
      monthData.workDays.includes(day.getDate())
    ) {
      return "work";
    } else {
      return "non-work";
    }
  }

  return (
    <div className="month">
      <div className="nameOfMonth">
        {monthNames[currentDayMonth]} <span>{currentDayYear}</span>
      </div>
      <div className="monthDays">
        {(() => {
          const dateComponents = [];
          for (let i = 1; i <= monthData.lastDay.getDate(); i++) {
            const newDay = new Date(currentDayYear, currentDayMonth, i);
            const isWork = isWorkDay(newDay, startDay);
            dateComponents.push(
              <Day
                key={i}
                newDay={newDay}
                isWork={isWork}
                setMonthArray={setMonthArray}
                // setChanges={setChanges}
                setMonthChanges={setMonthChanges}
              />
            );
          }
          return dateComponents;
        })()}
      </div>
    </div>
  );
}

export default Month;

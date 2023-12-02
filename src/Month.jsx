import "./App.css";
import Day from "./day.jsx";

function Month({ monthData, currentDayYear }) {
  const startDay = new Date(2023, 9, 4);
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
    // Рабочим будем считать каждый четвертый день, включая стартовый день
    if (dayDiff % 4 === 0) {
      return "work";
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
              <Day key={i} newDay={newDay} isWork={isWork} />
            );
          }
          return dateComponents;
        })()}
      </div>
    </div>
  );
}

export default Month;

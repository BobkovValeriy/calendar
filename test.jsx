import React, { useEffect, useState } from "react";
import "./App.css";
import Month from "./Month.jsx";

function App() {
  const day = new Date();
  const currentDayMonth = day.getMonth();
  const currentDayYear = day.getFullYear();
  const [monthShow, setMonthShow] = useState(1);
  const firstDayOfCurrentMonth = new Date(currentDayYear, currentDayMonth, 1);
  const firstDayOfPreviousMonth = new Date(
    currentDayYear,
    currentDayMonth - 1,
    1
  );
  const firstDayOfNextMonth = new Date(currentDayYear, currentDayMonth + 1, 1);
  const [monthArray, setMonthArray] = useState([
    {
      firstDay: firstDayOfPreviousMonth,
      lastDay: new Date(currentDayYear, currentDayMonth, 0),
      workDays: [],
    },
    {
      firstDay: firstDayOfCurrentMonth,
      lastDay: new Date(currentDayYear, currentDayMonth + 1, 0),
      workDays: [],
    },
    {
      firstDay: firstDayOfNextMonth,
      lastDay: new Date(currentDayYear, currentDayMonth + 2, 0),
      workDays: [],
    },
  ]);

  useEffect(() => {
    // Функция для загрузки рабочих дней с сервера
    const fetchWorkDays = async (monthData) => {
      try {
        const response = await fetch(
          `http://localhost:3001/workdays?year=${monthData.firstDay.getFullYear()}&month=${monthData.firstDay.getMonth()}`
        );
        const data = await response.json();
        // Обновляем состояние месяца, добавляя рабочие дни
        setMonthArray((prevMonthArray) =>
          prevMonthArray.map((prevMonth) =>
            prevMonth.firstDay.getMonth() === monthData.firstDay.getMonth()
              ? { ...prevMonth, workDays: data }
              : prevMonth
          )
        );
      } catch (error) {
        console.error("Error fetching work days:", error);
      }
    };

    // Загружаем рабочие дни для каждого месяца
    monthArray.forEach((monthData) => fetchWorkDays(monthData));
  }, []);

  function monthSwitch() {}

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Month
          key={monthArray[monthShow].firstDay.getTime()}
          monthData={monthArray[monthShow]}
          currentDayYear={currentDayYear}
        />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;

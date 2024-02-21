import React, { useEffect, useState } from "react";
import "./App.css";
import Month from "./Month.jsx";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";

function LoginedApp() {
  const day = new Date();
  const currentDayMonth = day.getMonth();
  const currentDayYear = day.getFullYear();
  let nextMonthYear = currentDayYear;
  if (currentDayMonth === 11) {
    nextMonthYear += 1;
  }
  const [monthChanges, setMonthChanges] = useState(undefined);
  const [monthShow, setMonthShow] = useState(1);
  // const [changes, setChanges] = useState(0);
  const [downloadAfterChanges, setDownloadAfterChanges] = useState(1);
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
      lastDay: new Date(nextMonthYear, currentDayMonth + 2, 0),
      workDays: [],
    },
  ]);
  // Функция для загрузки рабочих дней с сервера
  const fetchWorkDays = async (monthData) => {
    // console.log(monthData.firstDay.toISOString());
    axios
      .get(
        `https://eu-central-1.aws.data.mongodb-api.com/app/data-yjqvx/endpoint/getworkday?firstDay=${monthData.firstDay.toISOString()}`
      )
      .then((response) => {
        // console.log(response);

        let parsedData;
        try {
          parsedData = response.data;
          console.log("response ", response, " parsedData", parsedData);
        } catch (error) {
          console.error("Ошибка при разборе JSON:", error);
          parsedData = []; // Задаем пустой массив в случае ошибки разбора JSON
        }

        setMonthArray((prevMonthArray) =>
          prevMonthArray.map((prevMonth) =>
            prevMonth.firstDay === monthData.firstDay
              ? { ...prevMonth, workDays: parsedData }
              : prevMonth
          )
        );
      })
      .catch((error) => {
        console.error("Ошибка при получении данных из базы данных:", error);
      });
  };

  const sendDataToServer = async () => {
    try {
      if (monthChanges) {
        const changedMonthIndex = monthArray.findIndex(
          (monthData) => monthData.firstDay.getMonth() === monthChanges
        );

        if (changedMonthIndex !== -1) {
          const changedMonthData = monthArray[changedMonthIndex];
          //console.log("Changed Month Data:", changedMonthData.firstDay);

          await fetch(
            "https://eu-central-1.aws.data.mongodb-api.com/app/data-yjqvx/endpoint/addcalendarrecord",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...changedMonthData }),
            }
          );

          // Обновляем monthChanges для отслеживания изменений в месяцах
          setMonthChanges(undefined);
        }
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };
  useEffect(() => {
    if (monthChanges) sendDataToServer();
    console.log(monthArray);
  }, [monthChanges]);
  useEffect(() => {
    if (downloadAfterChanges) {
      monthArray.forEach((monthData) => fetchWorkDays(monthData));
      setDownloadAfterChanges(0);
    }
  }, [downloadAfterChanges]);

  function monthSwitchDown() {
    setMonthShow((prev) => (prev === 0 ? 2 : prev - 1));
  }

  function monthSwitchUp() {
    setMonthShow((prev) => (prev === 2 ? 0 : prev + 1));
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="main">
        <div className="left-margin" onClick={monthSwitchDown}>
          <AiOutlineArrowRight className="arrow-left" />
        </div>
        <Month
          key={monthArray[monthShow].firstDay.getTime()}
          monthData={monthArray[monthShow]}
          currentDayYear={monthArray[monthShow].lastDay.getFullYear()}
          setMonthArray={setMonthArray}
          // setChanges={setChanges}
          setMonthChanges={setMonthChanges}
        />
        <div className="right-margin" onClick={monthSwitchUp}>
          <AiOutlineArrowRight className="arrow-right" />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default LoginedApp;

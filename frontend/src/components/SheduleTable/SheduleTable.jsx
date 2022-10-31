import React, {useEffect, useState, useMemo} from "react";
import "./SheduleTable.css";
import apiSchedule from "../../api/schedule";
import {ToastContainer, toast} from "react-toastify";

function SheduleTable() {
  const [lessons, setLessons] = useState([]);

  const nextDayLessons = useMemo(() => {
    return lessons.filter(lesson => {
      return new Date(lesson.date).getDay() === new Date().getDay() + 1;
    });
  }, [lessons]);

  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const day = new Date().getDay();

  useEffect(async () => {
      try {
        const request = {
          files: [{fileName: 'test2'}]
        };
        const response = await apiSchedule.get(request);
        setLessons(response.data.message[0]);
      } catch (error) {
        console.error(error);
        console.error('ERROR GET LESSONS');
        toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
      }
  }, []);

  return (
    <div className='shedule-table'>
      <table className='table'>
        <thead>
          <tr className='table-tr'>
            <td className='table-td'>{days[day]}</td>
            <td className='table-td'>{days[day + 1] ? days[day + 1] : days[0]}</td>
          </tr>
        </thead>
        <tbody>
          <tr className='table-tr'>
            <td className='table-td'>
              <ul>
                {lessons.map((lesson, index) => (
                    new Date().getDay() === new Date(lesson.date).getDay() &&
                    <li key={index}>{lesson.lesson}</li>
                ))}
              </ul>
            </td>
            <td className='table-td'>
              {nextDayLessons.length ?
                  <ul>
                    {nextDayLessons.map((lesson, index) => (
                        <li key={index}>{lesson.lesson}</li>
                    ))}
                  </ul>
                  :
                  'Нет занятий'
              }
            </td>
          </tr>
        </tbody>
      </table>

      <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{width: '500px'}}
      />
    </div>
  );
}

export default SheduleTable;

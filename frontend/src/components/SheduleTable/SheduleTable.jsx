import React from "react";
import "./SheduleTable.css";

function SheduleTable() {
  var days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  var d = new Date();
  var n = d.getDay();
  var lessons = [
    "Математика",
    "Математика",
    "Математика",
    "Русский",
    "Математика",
    "Математика",
    "Математика",
  ];
  return (
    <div className='shedule-table'>
      <table className='table'>
        <thead>
          <tr className='table-tr'>
            <td className='table-td'>{days[n]}</td>
            <td className='table-td'>{days[n + 1]}</td>
          </tr>
        </thead>
        <tbody>
          <tr className='table-tr'>
            <td className='table-td'>
              <ul>
                {lessons.map((lesson, index) => (
                  <li key={index}>{lesson}</li>
                ))}
              </ul>
            </td>
            <td className='table-td'>
              <ul>
                {lessons.map((lesson, index) => (
                  <li key={index}> {lesson}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SheduleTable;

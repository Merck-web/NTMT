import React, {useState} from "react";
import plan from "../json/plan";

function PlanScreen() {
  const [disp, setDisp] = useState();
  const [practise, setPractise] = useState();
  console.log(plan)
  return (
    <div>
      <div className='title'>Учебный план</div>
      <div className='detail-record-book'>
        <div className='detail-napr'>
          <span>Направление:</span> Компьютерные системы и комплексы
        </div>
        <div className='detail-qval'>
          <span>Квалификация:</span> Техник
        </div>
        <div className='detail-form'>
          <span>Выбор семестра:</span> Все семестры
        </div>
      </div>
      <div className='details-table'>
        <table className='detail-table'>
          <thead className='detail-thead'>
            <tr>
              <td>Дисциплина</td>
              <td>Кол-во зачетных единиц/часов</td>
              <td>Отчетность</td>
              <td>Семестры</td>
            </tr>
          </thead>
          <tbody>
            {plan.map((plan, index) => (
              <tr key={index}>
                <td className='zach-detail'>{plan.disciplina}</td>
                <td className='zach-detail'>{plan.hours}</td>
                <td className='zach-detail'>{plan.itog}</td>
                <td className='zach-detail'>{plan.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlanScreen;

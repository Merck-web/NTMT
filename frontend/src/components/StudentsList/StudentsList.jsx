import React from "react";
import { Table } from "react-bootstrap";

function StudentsList({ user }) {
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Почта</th>
            <th>Телефон</th>
          </tr>
        </thead>
        <tbody>
          {user.map((student) => {
            return (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.username}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default StudentsList;

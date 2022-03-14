import React, { useState, useEffect } from "react";
import StudentsList from "../components/StudentsList/StudentsList";

function Students() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div>
      <StudentsList user={user} />
    </div>
  );
}

export default Students;

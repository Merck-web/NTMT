import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Headers from "./components/Header/Header";
import PersonalArea from "./screens/PersonalArea";
import FileScreen from "./screens/FileScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import PlanScreen from "./screens/PlanScreen";
import RecordBookScreen from "./screens/RecordBookScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import { useState, useEffect } from "react";
import Login from "./screens/Login";

function App() {
  const [token, setToken] = useState();
  useEffect(() => {
    // setToken(" ");
    localStorage.setItem("token", 1);
  }, []);
  const auth = localStorage.getItem("token");
  console.log(auth);
  return (
    <Router>
      {auth !== "" ? (
        <>
          <main className="container">
            <Headers />
            <PersonalArea />
            <div className="routers">
              <Route path="/yvedomlenia">
                <NotificationsScreen />
              </Route>
              <Route path="/ras">
                <ScheduleScreen />
              </Route>
              <Route path="/fail">
                <FileScreen />
              </Route>
              <Route path="/zachetka">
                <RecordBookScreen />
              </Route>
              <Route path="/plan">
                <PlanScreen />
              </Route>
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <main className="container">
          <Login />
        </main>
      )}
    </Router>
  );
}

export default App;

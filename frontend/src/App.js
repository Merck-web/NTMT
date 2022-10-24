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
import Login from "./screens/Login/Login";

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token') || '');
    if (token) {
      localStorage.setItem('token', token || '');
    }
  }, [token]);

  return (
    <Router>

      {token ? (
        <>
          <main className='container'>
            <Headers
                setToken={setToken}
                user={user}
                setUser={setUser}
            />
            <div className='content'>
              <PersonalArea />
              <div className='routers'>
                <Route path='/yvedomlenia' component={NotificationsScreen} />
                <Route path='/ras' component={ScheduleScreen} />
                <Route path='/fail' component={FileScreen} />
                <Route path='/zachetka' component={RecordBookScreen} />
                <Route path='/plan' component={PlanScreen} />
              </div>
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <main className='container'>
          <Login
              setToken={setToken}
              setUser={setUser}
          />
        </main>
      )}
    </Router>
  );
}

export default App;

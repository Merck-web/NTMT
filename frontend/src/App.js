import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Headers from "./components/Header/Header";
import PersonalArea from "./screens/PersonalArea";
import test from "./components/test";

function App() {
  return (
    <Router>
      <main className='container'>
        <Headers />
        <PersonalArea />
        <Switch>
          <Route path='/yvedomlenia' component={test} />
          <Route path='/ras' component={test} />
          <Route path='/fail' component={test} />
          <Route path='/zachetka' component={test} />
          <Route path='/plan' component={test} />
        </Switch>

        <Footer />
      </main>
    </Router>
  );
}

export default App;

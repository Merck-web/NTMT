import Students from "./screens/Students";
import Schedule from "./screens/Schedule";
import Main from "./screens/Main";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Headers from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Headers />
      <main className="py-3">
        <Container>
          <Route path="/" component={Main} exact />
          <Route path="/Schedule" component={Schedule}  />
          <Route path="/Students" component={Students} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

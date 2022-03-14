import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Headers from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Headers />
      <main className="py-3">
        <Container>qweqwe</Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

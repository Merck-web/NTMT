import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Headers from "./components/Header/Header";

function App() {
  return (
    <Router>
      <main className='container'>
        <Headers />
        <Footer />
      </main>
    </Router>
  );
}

export default App;

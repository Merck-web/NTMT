import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Headers from "./components/Header/Header";
import PersonalArea from "./screens/PersonalArea";

function App() {
  return (
    <Router>
      <main className='container'>
        <Headers />
        <PersonalArea />
        <Footer />
      </main>
    </Router>
  );
}

export default App;

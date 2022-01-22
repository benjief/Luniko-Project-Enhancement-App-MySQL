import "./App.css";
// Router is apparently the standard name for BrowserRouter, so we rename it here
import { BrowserRouter as Router, Routes as Switch, Route, Link } from "react-router-dom"
import Personnel from "./pages/Personnel";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/personnel" element={<Personnel />} />
        <Route path="/" element={<Home />} />
      </Switch>
    </Router>
  );
}

export default App;
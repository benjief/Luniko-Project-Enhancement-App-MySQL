import "./App.css";
// Router is apparently the standard name for BrowserRouter, so we rename it here
import { BrowserRouter as Router, Route, Routes as Switch, Link } from "react-router-dom"
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Login />} />
      </Switch>
    </Router>
  );
}

export default App;
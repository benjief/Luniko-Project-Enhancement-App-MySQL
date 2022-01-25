import "./App.css";
// Router is apparently the standard name for BrowserRouter, so we rename it here
import { BrowserRouter as Router, Route, Routes as Switch, Link } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
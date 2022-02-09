import "./App.css";
// Router is apparently the standard name for BrowserRouter, so we rename it here
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Dashboard from "./pages/Dashboard";
import CreateRequest from "./pages/CreateRequest";
import SubmittedRequests from "./pages/SubmittedRequests";
import AddOwnedRequests from "./pages/AddOwnedRequests";
import OwnedRequests from "./pages/OwnedRequests";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/create-request/:uid/:isIdentifier/:isOwner" element={<CreateRequest />} />
          <Route exact path="/submitted-requests/:uid/:isIdentifier/:isOwner" element={<SubmittedRequests />} />
          <Route exact path="/add-owned-requests/:uid/:isIdentifier/:isOwner" element={<AddOwnedRequests />} />
          <Route exact path="/owned-requests/:uid/:isIdentifier/:isOwner" element={<OwnedRequests />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
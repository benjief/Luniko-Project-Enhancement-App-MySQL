import "./App.css";
import { useState } from "react";

function App() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  return (
    <div className="App">
      <div className="information">
        <label>First Name: </label>
        <input
          type="text"
          onChange={(event) => {
            setFirstName(event.target.value)
          }}>
        </input>
        <label>Last Name: </label>
        <input
          type="text"
          onChange={(event) => {
            setLastName(event.target.value)
          }}>
        </input>
        <label>Email: </label>
        <input
          type="email"
          onChange={(event) => {
            setEmail(event.target.value)
          }}>
        </input>
        <label>Phone: </label>
        <input
          type="tel"
          onChange={(event) => {
            setPhone(event.target.value)
          }}>
        </input>
        <label>Company: </label>
        <input
          type="text"
          onChange={(event) => {
            setCompany(event.target.value)
          }}>
        </input>
        <button>
          Add Personnel
        </button>
      </div>
    </div>
  );
}

export default App;

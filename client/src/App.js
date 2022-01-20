import './App.css';
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
        <input type="text"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <label>Last Name: </label>
        <input type="text"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <label>Email: </label>
        <input type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Phone: </label>
        <input type="tel"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />
        <label>Company: </label>
        <input type="text"
          onChange={(event) => {
            setCompany(event.target.value);
          }}
        />
        <button>Add Personnel</button>
      </div>
    </div>
  );
}

export default App;

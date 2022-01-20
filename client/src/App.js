import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  // const displayinfo = () => {
  //   console.log(firstName + lastName + email + phone + company);
  // }

  const addPersonnel = () => {
    // Sending an object (body) if include comma after address
    // Also note that this is a promise
    Axios.post("http://localhost:3001/create", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      company: company,
    }).then(() => {
      console.log("Information sent from front to back end!");
    });
  };

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
        <button onClick={addPersonnel}>Add Personnel</button>
      </div>
    </div>
  );
}

export default App;

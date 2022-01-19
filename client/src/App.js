import './App.css';

function App() {
  return (
    <div className="App">
      <div className="information">
        <label>First Name: </label>
        <input type="text"></input>
        <label>Last Name: </label>
        <input type="text"></input>
        <label>Email: </label>
        <input type="email"></input>
        <label>Phone: </label>
        <input type="tel"></input>
        <label>Company: </label>
        <input type="text"></input>
        <button>Add Personnel</button>
      </div>
    </div>
  );
}

export default App;

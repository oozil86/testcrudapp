import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./Shared/Main";

function App() {
  console.log("First App");
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Main />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;

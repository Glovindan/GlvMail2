import './styles/App.css'
import AuthPage from "./Pages/AuthPage/AuthPage";
import {useState} from "react";
import MainPage from "./Pages/MainPage/MainPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({})
  return (
    <div className="App">
      {
        isLoggedIn ?
        <MainPage/> :
        <AuthPage setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>
      }
    </div>
  );
}

export default App;

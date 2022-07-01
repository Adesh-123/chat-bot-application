import React from 'react'
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Chat from "./pages/Chat"
import Register from "./pages/Register"
import Login from "./pages/Login"
import SetAvatar from './pages/SetAvatar'

function App() {
  const user=JSON.parse(localStorage.getItem("user"));
  return (
    <>
    <Router>
      <Switch>
          <Route exact path="/">
            <Chat/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/setAvatar">
            <SetAvatar/>
          </Route>        
      </Switch>
    </Router>
    </>
  )
}

export default App
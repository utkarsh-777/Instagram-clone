import React,{useReducer, useEffect, useContext} from 'react';
import "./App.css"
import {BrowserRouter as Router,Route,useHistory, Switch} from "react-router-dom"
import Home from "./components/home"
import Login from "./components/login"
import signup from "./components/signup"
import Profile from "./components/profile"
import Createpost from './components/createpost';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './Context/mycontext'
import {initialState,reducer} from './Context/reducer'
import { USER } from './Context/action.types';
import UserProfile from './components/userprofile';
import FollowingPosts from "./components/followingposts"
import Reset from "./components/reset"
import Password from './components/newpassword';

const Routing = () => {
  const {dispatch} = useContext(UserContext)
  const history = useHistory()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:USER,payload:user})
    }else{
      if(!history.location.pathname.startsWith("/reset")){
        history.push('/login')
      }
    }
  },[])

  return(
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={signup} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/create' component={Createpost} />
      <Route exact path='/user' component={UserProfile} />
      <Route exact path='/followingposts' component={FollowingPosts} />
      <Route exact path="/resetpassword" component={Reset} />
      <Route exact path="/reset/:token" component={Password} />
    </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div>
    <UserContext.Provider value={{state,dispatch}}>
      <Router>
        <Routing />
      </Router>
    </UserContext.Provider>
    </div>
  );
}

export default App;

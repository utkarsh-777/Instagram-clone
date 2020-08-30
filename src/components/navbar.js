import React, { useContext } from 'react'
import {Link, useHistory } from 'react-router-dom'
import {UserContext} from '../Context/mycontext'
import M from 'materialize-css'
import { REMOVE } from '../Context/action.types'

const Navbar = () => {

    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()

    const logout = () => {
        localStorage.clear()
        dispatch({
            type:REMOVE,
        })
        M.toast({html:'Logout Successful!',classes: 'rounded #8bc34a light-green'})
        history.push("/login")
    }

    const mylist = () => {
        if(state){
            return[
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li><Link to="/followingposts">My Following's Posts</Link></li>,
                <li>
                    <button onClick={()=>logout()} className="btn-small #ff5252 red accent-2" type="submit" name="action">
                    Logout
                    </button>
                </li>
            ]
        }else{
            return[
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    return( 
        <nav>
            <div className="nav-wrapper white">
            <Link to={state ? '/':'/login'} className="brand-logo left" style={{marginLeft:'10px'}}>Instagram</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {mylist()}
            </ul>
            </div>
        </nav>)
}

export default Navbar


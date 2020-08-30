import React, { useContext,useRef,useEffect,useState } from 'react'
import {Link, useHistory } from 'react-router-dom'
import {UserContext} from '../Context/mycontext'
import M from 'materialize-css'
import { REMOVE } from '../Context/action.types'

const Navbar = () => {

    const searchModal = useRef(null)
    const [search,setSearch] = useState("")
    const [users,setUsers] = useState("")
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    
    useEffect(()=> {
        M.Modal.init(searchModal.current)
    },[])

    
    const logout = () => {
        localStorage.clear()
        dispatch({
            type:REMOVE,
        })
        M.toast({html:'Logout Successful!',classes: 'rounded #8bc34a light-green'})
        history.push("/login")
    }

    const searchUser = () => {
        fetch('http://localhost:5000/search-user',{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query:search
            })
        }).then(res=>res.json())
        .then(result=>{
            setUsers(result)
        })
    }

    const userprofile = (userId) => {
        if(state._id.toString()===userId.toString()){
            M.toast({html:'Your profile',classes:'rounded #8bc34a light-green'})
            M.Modal.getInstance(searchModal.current).close()
            return history.push('/profile')
        }
        M.Modal.getInstance(searchModal.current).close()
        return history.push('/user',{params:userId})
    }

    const mylist = () => {
        if(state){
            return[
                <li key='1'><i data-target="modal1" className="modal-trigger large material-icons" style={{color:'black'}}>search</i></li>,
                <li key='2'><Link to="/profile">Profile</Link></li>,
                <li key='3'><Link to="/create">Create Post</Link></li>,
                <li key='4'><Link to="/followingposts">My Following's Posts</Link></li>,
                <li key='5'>
                    <button onClick={()=>logout()} className="btn-small #ff5252 red accent-2" type="submit" name="action">
                    Logout
                    </button>
                </li>
            ]
        }else{
            return[
                <li key='6'><Link to="/login">Login</Link></li>,
                <li key='7'><Link to="/signup">Signup</Link></li>
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
            <div id="modal1" className="modal" ref={searchModal} style={{color:'black'}}>
                <div className="modal-content">
                    <input
                    type='text'
                    placeholder='Search for user'
                    name='search'
                    value={search}
                    onChange={(e)=>{
                        setSearch(e.target.value)
                        searchUser()
                    }}
                    />
                    <ul className="collection">
                        {users ? 
                             <div>
                                {users.map(user=>{
                                    return(
                                    <li key={user._id} className="collection-item"><span onClick={()=>userprofile(user._id)}>{user.email}</span></li>
                                    )
                                })}
                             </div>
                            :
                            <div></div>
                        }
                        
                    </ul>
                </div>
                <div className="modal-footer">
                <button className="modal-close waves-effect waves-green btn-flat">Close</button>
                </div>
            </div>
        </nav>)
}

export default Navbar


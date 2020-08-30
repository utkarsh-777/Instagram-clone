import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../Context/mycontext'
import {USER} from '../Context/action.types'
import Navbar from './navbar'

const Login = () => {

    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {dispatch} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/login',{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        })
            .then(res=>res.json())
            .then(result=>{
                if(result.error){
                    return  M.toast({html: result.error,classes: 'rounded #f44336 red'})
                }
                if(result.message){
                    return  M.toast({html: result.message,classes: 'rounded #f44336 red'})
                } else {
                 M.toast({html: 'Login successful!',classes: 'rounded #8bc34a light-green'})
                 dispatch({type:USER,payload:result.user})
                 localStorage.setItem('token',result.token)
                 localStorage.setItem('user',JSON.stringify(result.user))
                 history.push('/')
                }
            })
    }

    return(   
        <div>
            <Navbar />
            <div className='card mycard input-field'>
                <h2 id='topic'>Instagram</h2>
                <input
                type='email'
                placeholder='email'
                name='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                type='password'
                placeholder='password'
                name='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button onClick={handleSubmit} className="btn waves-effect waves-light #64b5f6 blue darken-1" id='lbtn' type="submit" name="action">
                    Login
                </button>
                <div id='topic' className='lors'></div>
                <p><Link id='lor1' to='/resetpassword'>Forgot Password?</Link></p>
                <Link id='lor' to='/signup'>Do not have an account?</Link>
            </div>
            
        </div>
    )
}

export default Login
import React, { useState } from 'react'
import { useHistory,useParams } from 'react-router-dom'
import M from 'materialize-css'
import Navbar from './navbar'

const Password = () => {

    const history = useHistory()
    const [password,setPassword] = useState("")
    const {token} = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/new-password',{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                password,
                token
            })
        })
            .then(res=>res.json())
            .then(result=>{
                if(result.error){
                    return  M.toast({html: result.error,classes: 'rounded #f44336 red'})
                }
              
                 M.toast({html: result.message ,classes: 'rounded #8bc34a light-green'})
                 history.push('/login')
              
            })
    }
    return(   
        <div>
            <Navbar />
            <div className='card mycard input-field'>
                <h2 id='topic'>Instagram</h2>
                <input
                type='password'
                placeholder='password'
                name='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button onClick={handleSubmit} className="btn waves-effect waves-light #64b5f6 blue darken-1" id='lbtn' type="submit" name="action">
                    Reset Password
                </button>
            </div>
            
        </div>
    )
}

export default Password
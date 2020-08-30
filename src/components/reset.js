import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
import Navbar from './navbar'

const Reset = () => {

    const history = useHistory()
    const [email,setEmail] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/reset-password',{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email
            })
        })
            .then(res=>res.json())
            .then(result=>{
                if(result.error){
                    return  M.toast({html: result.error,classes: 'rounded #f44336 red'})
                }
                 M.toast({html: result.message ,classes: 'rounded #8bc34a light-green'})
                return history.push('/login')
            })
    }

    return(   
        <div>
            <Navbar />
            <div className='card mycard input-field'>
                <h2 id='topic'>Instagram</h2>
                <input
                type='text'
                placeholder='email'
                name='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <button onClick={handleSubmit} className="btn waves-effect waves-light #64b5f6 blue darken-1" id='lbtn' type="submit" name="action">
                    Reset Password
                </button>
            </div>
            
        </div>
    )
}

export default Reset
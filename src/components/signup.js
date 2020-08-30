import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import Navbar from './navbar'

const SignUp = () => {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [photo,setPhoto] = useState("")
    const [url,setUrl] = useState("")

    const history = useHistory()

    const uploadpic = () => {
        const data = new FormData()
        data.append("file",photo)
        data.append("upload_preset","Insta-clone")
        data.append("cloud_name","dg5o9ga4k")
        fetch(" https://api.cloudinary.com/v1_1/dg5o9ga4k/image/upload",{
            method:'post',
            body:data
        }).then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/signup',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        })
            .then(res=>res.json())
            .then(result=>{
                if(result.error){
                    return M.toast({html: result.error,classes: 'rounded #f44336 red'})
                }
                else{
                    M.toast({html: result.message+' Please login to continue!',classes:'rounded #8bc34a light-green'})
                    history.push('/login')
                }
            })
    }
    return(   
        <div>
            <Navbar />
            <div className='card mycard input-field'>
                <h2 id='topic'>Instagram</h2>
                <input
                type='text'
                placeholder='name'
                name='name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
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
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload Profile Pic</span>
                        <input 
                        type="file"
                        onChange={(e)=>setPhoto(e.target.files[0])} 
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button onClick={handleSubmit} className="btn waves-effect waves-light #64b5f6 blue darken-1" id='lbtn' type="submit" name="action">
                    SignUp
                </button>
                <div id='topic' className='lors'>Do you have an account?</div>
                <Link id='lor' to='/login'>Login</Link>
            </div>
        </div>
    )
}

export default SignUp
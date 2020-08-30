import React, { useState } from 'react'
import Navbar from './navbar';
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const Createpost = () => {
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [photo,setPhoto] = useState("")
    const [url,setUrl] = useState("")
    const history = useHistory()

    const postData = () => {
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

        fetch('http://localhost:5000/createpost',{
            method:'post',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
                title,
                description,
                photo:url
            })
        }).then(res=>res.json())
        .then(data => {
            if (data.error){
               return M.toast({html:data.error,classes:'rounded #f44336 red'})
            }
            M.toast({html:'Posted!',classes:'rounded #8bc34a light-green'})
            console.log(data)
            history.push('/')
        })
        .catch(err=>console.log(err))
    }

    return(
        <div>
        <Navbar />
            <div className='card input-field' id='create'>
                <input
                type='text' 
                placeholder='Title' 
                name='title'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
                <input 
                type='text' 
                placeholder='Description' 
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />

                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload Image</span>
                        <input 
                        type="file"
                        onChange={(e)=>setPhoto(e.target.files[0])} 
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button onClick={()=>postData()} className="btn waves-effect waves-light #64b5f6 blue darken-1" id='lbtn' type="submit" name="action">
                    Submit Post
                </button>
            </div>
        </div>
    )
}

export default Createpost;
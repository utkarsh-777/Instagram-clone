import React, { useState, useContext, useEffect } from 'react'
import Navbar from './navbar'
import {useLocation} from 'react-router-dom'
import {UserContext} from "../Context/mycontext"
import {USER} from "../Context/action.types"

const UserProfile = () => {
    const location = useLocation()
    const myparams = location.state.params
    const {dispatch} = useContext(UserContext)
    const user = JSON.parse(localStorage.getItem('user'))
    const [data,setData] = useState("")
    const [postdata,setPostdata] = useState("")

    useEffect(()=>{
        dispatch({type:USER,payload:JSON.parse(localStorage.getItem('user'))})
        fetch(`http://localhost:5000/user/${myparams}`,{
            method:'get',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.user)
            setPostdata(result.posts)
        })
    },[])

    const follow = () => {
        fetch(`http://localhost:5000/follow/${myparams}`,{
            method:'put',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(res=>res.json())
        .then(result=>{
            localStorage.setItem('user',JSON.stringify(result.user))
            setData(result.otheruser)
            dispatch({type:USER,payload:result.user})
        })
    }

    const unfollow = () => {
        fetch(`http://localhost:5000/unfollow/${myparams}`,{
            method:'put',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(res=>res.json())
        .then(result=>{
            localStorage.setItem('user',JSON.stringify(result.user))
            setData(result.otheruser)
            dispatch({type:USER,payload:result.user})
        })
    }

    return(
        <div>
            <Navbar />
            <div style={{maxWidth:'900px',margin:'0px auto'}}>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    margin:"18px 0px",
                    borderBottom:'1px solid grey'
                }}>
                    <div>
                    <img src="https://i0.wp.com/www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png?fit=550%2C532&ssl=1" alt='...' style={{width:"160px",height:"160px",borderRadius:"80px"}} />
                    </div>
                    <div>
                    <h4>{data ? data.name : 'loading'}</h4>
                    <h4>{data ? data.email : 'loading'}</h4>
                    {
                        user.following.includes(data._id) ? 
                        <button className='btn' onClick={()=>unfollow()}>Unfollow</button> 
                        :
                        <button className='btn' onClick={()=>follow()}>follow</button>
                    }
                    <div style={{display:"flex",justifyContent:'space-between',width:'108%'}}>
                        <h5>{postdata ? postdata.length: "loading"} posts</h5>
                        <h5>{data ? data.followers.length : 'loading'} followers</h5>
                        <h5>{data ? data.following.length : "loading"} following</h5>
                    </div>
                    </div>
                </div>
                <div className="gallery">
                    {postdata ?
                        (
                        postdata.map(item=>{
                            return(
                                <img key={item._id} src={item.photo} className='item' alt={item.title} />
                            )
                        })) : 'loading'
                    }
                </div>
            </div>
        </div>
    )
}

export default UserProfile
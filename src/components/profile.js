import React, { useEffect, useState, useContext } from 'react'
import Navbar from './navbar'
import {UserContext} from '../Context/mycontext'

const Profile = () => {
    const {state} = useContext(UserContext)
    const [mypost,setMypost] = useState([])

    useEffect(()=>{
        fetch("http://localhost:5000/myposts",{
            headers:{
                'Authorization':"Bearer "+localStorage.getItem("token")
            }
        }).then(res=>res.json())
        .then(data=>{
             setMypost(data.myposts)
        })
    },[])

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
                    <h4>{state ? state.name : 'loading'}</h4>
                    <div style={{display:"flex",justifyContent:'space-between',width:'108%'}}>
                        <h5>{mypost ? mypost.length:'loading'} posts</h5>
                        <h5>{state ? state.followers.length:'loading'} followers</h5>
                        <h5>{state ? state.following.length:'loading'} following</h5>
                    </div>
                    </div>
                </div>
                <div className="gallery">
                    {
                        mypost.map(item=>{
                            return(
                                <img key={item._id} src={item.photo} className='item' alt={item.title} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
import React, { useEffect, useState,useContext } from 'react'
import Navbar from './navbar'
import { UserContext } from '../Context/mycontext'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const FollowingPosts = () => {
    const [post,setPost] = useState([])
    const {state} = useContext(UserContext)
    const [comment,setComment] = useState("")
    const history = useHistory()

    useEffect(()=>{
        fetch('http://localhost:5000/getsubposts',{
            method:'get',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(res=>res.json())
        .then(data => {
            setPost(data)
        })
    },[])

    const handleLike = (id) => {
        fetch('http://localhost:5000/like',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newdata = post.map(item=>{
                if(item._id.toString()===result._id.toString()){
                    return result
                }else{
                    return item
                }
            })
            setPost(newdata)
        }).catch(err=>console.log(err))
        
    }

    const handleUnlike = (id) => {
        fetch('http://localhost:5000/unlike',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newdata = post.map(item=>{
                if(item._id.toString()===result._id.toString()){
                    return result
                }else{
                    return item
                }
            })
            setPost(newdata)
        }).catch(err=>console.log(err))
    }

    const userprofile = (userId) => {
        if(state._id.toString()===userId.toString()){
            M.toast({html:'Your profile',classes:'rounded #8bc34a light-green'})
            return history.push('/profile')
        }
        history.push('/user',{params:userId})
    }

    const postComment = (id) => {
        console.log(typeof(comment))
        fetch('http://localhost:5000/comment',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body:JSON.stringify({
                postId:id,
                text:comment
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newdata = post.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setPost(newdata)
        }).catch(err=>console.log(err))
    }

    const deletePost = (postId) => {
        fetch(`http://localhost:5000/deletepost/${postId}`,{
            method:'delete',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(res=>res.json())
        .then(result=>{
            M.toast({html:'Deleted Successfully!',classes:'rounded #8bc34a light-green'})
            setPost(post.filter(item=>item._id.toString()!==result._id.toString()))
        })      
    }

    return(
        <div>
            <Navbar />
            <div className='home'>
                {post.map(post=>{
                    return(
                        <div className='card home-card' key={post._id}>
                            <h5><span onClick={()=>userprofile(post.postedBy._id)}>{post.postedBy.name}</span>
                            {post.postedBy.name.toString()===state.name.toString() ? (
                                <i onClick={()=>deletePost(post._id)} className="material-icons" style={{color:'red',float:'right'}}>delete</i>
                            ):(
                                <div></div>
                            )}
                            
                            </h5>
                            <div className='card-image'>
                                <img src={post.photo} alt='...' />
                            </div>
                            <div className='card-content'>
                            
                            {
                                post.likes.includes(state._id) ? 
                                   (
                                    <div>
                                        <i className="material-icons" style={{color:'red'}}>favorite</i>
                                        <i onClick={()=>handleUnlike(post._id)} className="material-icons">thumb_down</i>
                                    </div>
                                )
                                 : (
                                    <div>
                                        <i className="material-icons">favorite</i>
                                        <i onClick={()=>handleLike(post._id)} className="material-icons">thumb_up</i>  
                                    </div>
                                )
                            }       
                                <h6>{post.likes.length} likes</h6>
                                <h6>{post.title}</h6>
                                <p className='mb-4'>{post.description}</p>
                                {
                                    post.comments.map(item=>{
                                        return(
                                            <div key={item._id}>
                                                <h6><span style={{fontWeight:'bold'}}>{item.postedBy.name}</span> {item.text}</h6>
                                            </div>
                                        )
                                    })
                                }
                                <input type='text' placeholder='add a comment'
                                onChange={(e)=>setComment(e.target.value)}
                                />
                                <button onClick={()=>postComment(post._id)} className='btn'>
                                Comment
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FollowingPosts
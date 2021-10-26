import React,{ useState,useEffect } from 'react';
import './post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase_app'

function Post({ postId,username,imageUrl,caption }) {
    const [comments,setComments]=useState([]);

    useEffect(() => {
        if(postId) {
            const unsubsceribe=db
                .collection('posts')
                .doc(postId)
                .collection("comments")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.socs.map((doc) => doc.data()))
                })
        }
    },[postId])
    return (
        <div className='post'>
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt='GouthamKishore'
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>

            {/*header -> avatar + username */}
            <img className='post_image ' src={imageUrl}></img>
            {/*image */}
            <h4 className="post_text"><strong>{username}:</strong>&nbsp;{caption}</h4>
            {/*usename + caption */}

            <form>
                <input
                    className={'post_input'}
                    type="text"
                    placeholder="Add a comment..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Post

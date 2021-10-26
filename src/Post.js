import React,{ useState,useEffect } from 'react';
import firebase from 'firebase'
import './post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase_app'

function Post({ postId,username,imageUrl,caption,user }) {
    const [comments,setComments]=useState([]);
    const [comment,setComment]=useState('');

    useEffect(() => {
        let unsubsceribe
        if(postId) {
            unsubsceribe=db
                .collection('posts')
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp','desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }

        return () => {
            unsubsceribe()
        };
    },[postId])


    const postComment=(e) => {
        e.preventDefault();

        db.collection('posts').doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

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
            <div className="post_comments">
                {
                    comments.map((comment,id) => {
                        return <p className="comment" key={id}><strong>{comment.username}:</strong>  {comment.text}</p>
                    })

                }
            </div>


            {
                user&&(<form className={"post_commentbox"}>
                    <input
                        className={'post_input'}
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className={"post_button"}
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >Post</button>
                </form>)
            }

        </div>
    )
}

export default Post

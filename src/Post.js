import React from 'react';
import './post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({username, imageUrl , caption}) {
    return (
        <div className='post'>
            <div className="post_header">
            <Avatar 
            className="post_avatar"
            alt = 'GouthamKishore'
            src = "/static/images/avatar/1.jpg"
            />
            <h3>{username}</h3>
            </div>
            
            {/*header -> avatar + username */}
           <img  className = 'post_image ' src = {imageUrl}></img>
             {/*image */}
            <h4 className="post_text"><strong>{username}:</strong>&nbsp;{caption}</h4>
            {/*usename + caption */}
        </div>
    )
}

export default Post

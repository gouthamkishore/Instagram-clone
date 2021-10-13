import React,{useState, useEffect} from 'react'
import Post from './Post'
import './App.css';
import { db } from './firebase_app.js'

function App() {

  const [posts,setPosts] = useState([]);
  console.log('db',db.collection('posts'))

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post: doc.data()
      })))
    })
  },[ ])

console.log('posts',posts)

  return (
    <div className="App">
      <div className="app_header">
        <img 
        className={'app_headerImage'}
        src = '	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
        alt = 'logo'
        ></img>
      </div>
      <h1>HEADER</h1>
      {
        posts.map(({id,post})=>(
          <Post key={id}  username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      
    </div>
  );
}

export default App;
 
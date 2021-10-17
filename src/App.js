import React,{ useState,useEffect } from 'react'
import Post from './Post'
import './App.css';
import { db,auth } from './firebase_app.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import { Button,Input } from '@material-ui/core';



function getModalStyle() {
  const top=50;
  const left=50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    trsnsform: `translate(~${top}%, ~${left}%)`
  };
}
const useStyles=makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3)
  }
}))

function App() {
  const classes=useStyles();
  const [modalStyle]=useState(getModalStyle)
  const [posts,setPosts]=useState([]);
  const [open,setOpen]=useState(false);
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [user,setUser]=useState(null)

  // console.log('db',db.collection('posts'))

  useEffect(() => {
    const unSubscribe=auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //user has logged in
        //console.log(authUser);
        setUser(authUser);

        if(authUser.displayName) {
          //dont update isername
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        //user has logged out
        setUser(null)
      }
    })
    return () => {
      unSubscribe()
    }
  },[user,username]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc,//user has logged in.id,
        post: doc.data()
      })))
    })

  },[]);
  const signUp=(event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)

      .catch((error) => alert(error.message))
  }




  // console.log('posts',posts)

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className={'app_signup'}>
            <center>
              <img
                className={'app_headerImage'}
                src='	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='logo'
              ></img>
            </center>
            <Input
              placeholder='User Name'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
            <Input
              placeholder='Email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button onClick={signUp}> Sign Up </Button>
          </form>

        </div>
      </Modal>
      <div className="app_header">
        <img
          className={'app_headerImage'}
          src='	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='logo'
        ></img>
      </div>
      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      <h1>HEADER</h1>
      {
        posts.map(({ id,post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;

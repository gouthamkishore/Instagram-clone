import React,{ useState,useEffect } from 'react'
import Post from './Post'
import './App.css';
import { db,auth } from './firebase_app.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import { Button,Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed'


function getModalStyle() {
  const top=50;
  const left=50;

  return {

    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
const useStyles=makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),

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
  const [user,setUser]=useState(null);
  const [openSignin,setOpenSignin]=useState('')

  // console.log('db',db.collection('posts'))

  useEffect(() => {
    const unSubscribe=auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //user has logged in
        console.log(authUser);
        setUser(authUser);
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
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,//user has logged in.id,
        post: doc.data()
      })))
    })

  },[]);
  const signUp=(event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))

    setOpen(false)
  }
  const signIn=(event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
      .catch((error) => alert(error.message));

    setOpenSignin(false)
  }




  // console.log('posts',posts)

  return (
    <div>

      {/*file picker */}
      {/*post buttton*/}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={'app_modal'}
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

      <Modal
        open={openSignin}
        onClose={() => setOpenSignin(false)}
        className={'app_modal'}
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
            <Button onClick={signIn}> Sign In </Button>
          </form>

        </div>
      </Modal>

      <div className="app_header">
        <img
          className={'app_headerImage'}
          src='	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='logo'
        ></img>

        {
          user? (<Button onClick={() => auth.signOut()}>LogOut</Button>):
            (<div className="app_loginContainer">
              <Button onClick={() => setOpenSignin(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </div>)
        }
      </div>


      <div className="app_posts">

        <div className="app_postsleft">
          {
            posts.map(({ id,post }) => (
              <Post key={id} user={user} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))
          }
        </div>
        {/* <div className="app_postsright">
          <InstagramEmbed
            url='https://www.instagram.com/p/Bl0VshFBT8h/'
            clientAccessToken='123|456'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div> */}


      </div>

      {/*caption input */}
      {user?.displayName&&(<ImageUpload username={user.displayName} />)}

    </div>
  );
}

export default App;

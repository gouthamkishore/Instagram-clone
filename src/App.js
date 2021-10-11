import React from 'react'
import Post from './Post'
import './App.css';

function App() {

  const [posts,setPosts] = useState([
     
  ]);



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
      <Post username="Goutham" caption="It Works" imageUrl='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'/>
      <Post username="Preetham" caption="Super Cool" imageUrl='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'/>
      <Post username="Sharath" caption="Hows It????" imageUrl='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'/>
      <Post username="Pranika" caption="My Pic" imageUrl='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'/>
    </div>
  );
}

export default App;
 
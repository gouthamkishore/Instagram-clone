import { Button } from '@material-ui/core'
import React,{ useState,useEffect } from 'react'
import { db,storage } from './firebase_app'
import firebase from 'firebase';

function ImageUpload({ username }) {
    const [caption,setCaption]=useState('');
    const [progress,setProgress]=useState(0);
    const [image,setImage]=useState(null);
    const handleImage=(e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleUpload=(e) => {
        const uploadTask=storage.ref(`images/${image.name}`).put(image);

        uploadTask.on("state_changed",
            (snapshot) => {
                //progress function
                const progress=Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error) => {
                //Error Function
                alert(error.message)
            },
            () => {
                //completer function
                storage.ref('images')
                    .child(image.name)
                    .getDownloadURl()
                    .then(url => {
                        //post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        })
                    })
            }
        )
    }
    return (
        <div>
            <h1>Input</h1>
            <input type="text" placeholder='Enter a Caption...' onChange={e => setCaption(e.target.value)} />
            <input type="file" onChange={handleImage} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload


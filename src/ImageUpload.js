import { Button } from '@material-ui/core'
import React,{ useState,useEffect } from 'react'
import { db,storage } from './firebase_app'
import firebase from 'firebase';
import './imageUpload.css'

function ImageUpload({ username }) {
    const [caption,setCaption]=useState('');
    const [url,setUrl]=useState('')
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
                    .getDownloadURL()
                    .then((url) => {
                        setUrl(url);
                        //post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                        });

                        setCaption("");
                        setProgress(0);
                        setImage(null);


                        console.log(caption);
                        console.log(image);
                        console.log(progress);

                    })
            }
        )

    }
    return (
        <div className={"imageUpload"}>
            <progress className={'imageUplaod_progress'} value={progress} max="100"></progress>
            <input className={'imageUpload_captionHolder'} value={caption} type="text" placeholder='Enter a Caption...' onChange={e => setCaption(e.target.value)} />
            <input type="file" onChange={handleImage} />
            <button className={"imageUpload_button"} onClick={handleUpload}>Upload</button>
        </div>
    )
}

export default ImageUpload


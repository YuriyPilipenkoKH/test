import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

let li
const setLi = (x) => {
    return li  = x
   
}

export const handleLike = async (postId) => {
    // setLi(0)
    try {
        const collectionRef = doc(db, "posts", postId)
        
        
         onSnapshot(collectionRef, (querySnapshot)  =>  {
            
            const currentPost = querySnapshot.data();
            const likesCount = currentPost.likes
             console.log('likesCount',likesCount)
        //    setLikes(likesCount +1)
            setLi(likesCount +1)
           console.log('li', li)
            
        })
       await updateDoc(collectionRef, {  likes: li, });

    } 
    catch (error) {
        console.log('Error fetching likes:', error);
    }

};

export const countLikes = async (postId) => {
    // setLi(0)
    try {

        }
       

    
    catch (error) {
        
    }

};
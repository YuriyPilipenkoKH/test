import { arrayUnion, collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
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

export const countLikes = async (userId, postId) => {

    try {
        const postRef = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postRef);
    
        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();
          const likesArray = postData.likes;
    
          // Check if the userId already exists in the likesArray
          if (!likesArray.includes(userId)) {
            // Add the userId to the likesArray using arrayUnion
            const updatedLikesArray = arrayUnion(userId);
    
            // Update the document with the new likesArray
            await updateDoc(postRef, { likes: updatedLikesArray });
    
            console.log('User ID added to likes array successfully.');
          } else {
            console.log('User ID already exists in the likes array.');
          }
        } else {
          console.log('Post document not found');
        }
      } catch (error) {
        console.error('Error adding user ID to likes array:', error);
      }

};
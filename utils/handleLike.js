import { arrayUnion, collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";



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

const getAllPosts = async () => {

  setLoading(true);

  try {
    const dbRef = collection(db, "posts");
    const searchQuery = query(dbRef);
    onSnapshot(searchQuery, (docSnap) =>
      setPosts(docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))));

    setLoading(false);
  } catch (error) {
    console.log('Error fetching posts:', error);
    setLoading(false);
  }

}  
  const getAllPosts = async () => {
    const postsRef = collection(db, "posts");
    const querySnapshot = await getDocs(postsRef);
    const posts = [];
  
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
  
    return posts;
  };


  
  const getCommentsForPost = async (postId) => {
    const commentsRef = collection(db, `posts/${postId}/comments`);
    const querySnapshot = await getDocs(commentsRef);
    const comments = [];
  
    querySnapshot.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() });
    });
  
    return comments;
  };
  
  const retrievePostsWithComments = async () => {
    const posts = await getAllPosts();
  
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await getCommentsForPost(post.id);
        return { ...post, comments };
      })
    );
  
    return postsWithComments;
  };

  useEffect(() => {
    retrievePostsWithComments().then((postsWithComments) => {
      setPosts(postsWithComments);
    });
  }, []);


//   i m entering manually
//  `posts/iBTCXXb6hajtf6rMeZwo/comments` — this line works
//  `posts/${postId}/comments`   — this doesnt
//   why?
//However, when you use the template string 'posts/${postId}/comments', it suggests that the postId variable is not resolving to the expected value. The most common reason for this issue is that the postId variable is not assigned the correct value or is not accessible in the scope where you're using it.

//   The code you provided includes three functions: getAllPosts, getCommentsForPost, and retrievePostsWithComments. Let's break down how they work together to fetch posts with their associated comments:

// getAllPosts: This function retrieves all the posts from the "posts" collection in Firestore. It uses the collection function from the Firestore library to create a reference to the "posts" collection. Then, it calls getDocs to fetch the documents within the collection. The query snapshot is iterated using forEach, and for each document, a new post object is created with the document ID and the rest of the document data. The posts are stored in an array and returned.

// getCommentsForPost: This function retrieves the comments for a specific post. It takes a postId parameter to identify the post for which to fetch the comments. Similar to getAllPosts, it creates a reference to the "comments" collection within the specific post using collection. Then, it calls getDocs to fetch the comments documents. The query snapshot is iterated using forEach, and for each document, the comment data is added to an array. The comments array is then returned.

// retrievePostsWithComments: This function combines the previous two functions to retrieve posts with their associated comments. It calls getAllPosts to fetch all the posts. Then, it uses Promise.all and map to iterate over each post and fetch the comments for that post using getCommentsForPost. The resulting comments are added as a new property comments to each post object. The function returns an array of post objects with their associated comments.

// Finally, the useEffect hook is used to call retrievePostsWithComments when the component mounts. Once the promise is resolved, the returned posts with comments are set in the component's state using setPosts.

// By using these functions together and leveraging asynchronous operations, the code effectively retrieves the posts and their associated comments from Firestore, creating a data structure that includes the comments within each post object.

// We use Promise.all in the retrievePostsWithComments function to handle multiple asynchronous operations concurrently and ensure that all promises are resolved before proceeding.

// In the retrievePostsWithComments function, we have an array of posts from the getAllPosts function. We want to fetch the comments for each post using the getCommentsForPost function, which returns a promise for each post-comment retrieval operation. By using Promise.all, we can execute all these promises in parallel and wait for all of them to resolve.

// Promise.all takes an array of promises and returns a new promise that resolves to an array of resolved values when all the promises in the input array have resolved or rejects if any of the promises rejects. In our case, we pass an array of promises created by mapping over the posts array, where each promise represents the retrieval of comments for a specific post.

// The use of Promise.all allows us to efficiently retrieve comments for all posts concurrently instead of waiting for each comment retrieval to complete sequentially. Once all the promises are resolved, Promise.all returns an array of the resolved comments for each post. This array of post objects with their associated comments is then returned from the retrievePostsWithComments function.

// By leveraging Promise.all, we can optimize the retrieval process and improve performance by fetching comments for multiple posts simultaneously.

//================================

    {/* <View style = {styles.comment}>
            <ImageBackground style = {styles.avatar} source={AvImage1} size = {28}></ImageBackground>   
            <View style = {styles.card}>
                <Text style = {styles.commentText}>Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!</Text>
                <Text style = {styles.createdAt}> 09 червня, 2020 | 08:40</Text>
            </View> 
            </View> */}

            {/* <View style = {styles.comment}>
            <ImageBackground style = {styles.avatar} source={AvImage0} size = {28}></ImageBackground>   
            <View style = {styles.card}>
                <Text style = {styles.commentText}>A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.</Text>
                <Text style = {styles.createdAt}> 09 червня, 2020 | 09:14</Text>
            </View> 
            </View> */}

            {/* <View style = {styles.comment}>
            <ImageBackground style = {styles.avatar} source={AvImage1} size = {28}></ImageBackground>   
            <View style = {styles.card}>
                <Text style = {styles.commentText}>Thank you! That was very helpful!</Text>
                <Text style = {styles.createdAt}>09 червня, 2020 | 09:20</Text>
            </View> 
            </View> */}
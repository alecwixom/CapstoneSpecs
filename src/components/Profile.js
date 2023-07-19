import { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import AuthContext from '../store/authContext';

const Profile = () => {
  const { userId, token } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [editedPost, setEditedPost] = useState(null);

  const getUserPosts = useCallback(() => {
    axios
      .get(`http://localhost:4001/userposts/${userId}`, {
        headers: {
          authorization: token
        }
      })
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, [userId, token]);

  const deletePost = id => {
    axios
      .delete(`http://localhost:4001/posts/${id}`, {
        headers: {
          authorization: token
        }
      })
      .then(() => {
        getUserPosts();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const editPost = id => {
    const postToEdit = posts.find(post => post.id === id);
    setEditedPost(postToEdit);
  };

  const submitEditedPost = () => {
    axios
      .put(`http://localhost:4001/posts/${editedPost.id}`, editedPost, {
        headers: {
          authorization: token
        }
      })
      .then(() => {
        setEditedPost(null);
        getUserPosts();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

  return (
    <main>
      {posts.length >= 1 ? (
        <div>
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h2>{post.dayOfWeek}</h2>
              <h4>{post.user.username}</h4>
              <p>{post.description}</p>
              <div>
                <button className="delete-btn" onClick={() => deletePost(post.id)}>
                  Delete Post
                </button>
                <button className="edit-btn" onClick={() => editPost(post.id)}>
                  Edit Post
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <main>
          <h1>You haven't posted yet!</h1>
        </main>
      )}

      {editedPost && (
        <div className="edit-form">
          <h2>Edit Post</h2>
          <input
            type="text"
            value={editedPost.dayOfWeek}
            onChange={e =>
              setEditedPost(prevState => ({
                ...prevState,
                dayOfWeek: e.target.value
              }))
            }
          />
          <input
            type="text"
            value={editedPost.description}
            onChange={e =>
              setEditedPost(prevState => ({
                ...prevState,
                description: e.target.value
              }))
            }
          />
          <button onClick={submitEditedPost}>Submit</button>
        </div>
      )}
    </main>
  );
};

export default Profile;

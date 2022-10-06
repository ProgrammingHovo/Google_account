import { useEffect, useState } from 'react'
import './App.css';
import { MdOutlineLocalPostOffice } from 'react-icons/md';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import { Post } from './Post';


function App() {
  const [ user, setUser ] = useState({})
  const [ posts, setPosts ] = useState([])
  const [ comments, setComments ] = useState([])
  const [ totalPostInfo, setTotalPostInfo ] = useState([])

  
  console.log(totalPostInfo);
    

  const fetchPostsData = async () => {
    const postsResponse = await axios.get('https://dummyjson.com/posts')
    const commentsResponse = await axios.get('https://dummyjson.com/comments')
    setPosts(postsResponse.data.posts)
    setComments(commentsResponse.data.comments)
  }


  
function handleCallBackResponse(response) {
    let userObject = jwt_decode(response.credential)
    setUser(userObject)
    document.getElementById('signInDiv').hidden = true;

    fetchPostsData()


  }

  const handleClickSignOut = (event) => {
    setUser({})
    setPosts([])
    document.getElementById('signInDiv').hidden = false;
  }

  useEffect(() => {
    const commentBody = comments.map(comment => comment.body = {comment: comment.body})
    setTotalPostInfo(posts.map((item, i) => Object.assign({}, item, commentBody[i])))

  }, [posts])
 
  useEffect(() => {
    (() => {
      try {
        /*global google*/
        google.accounts.id.initialize({
          client_id: '194248398293-jo7qh88srfb9r6u5antvalm2c97pltjl.apps.googleusercontent.com',
          callback: handleCallBackResponse
        })
        

        google.accounts.id.renderButton(
          document.getElementById('signInDiv'),
          { theme: 'outline', size: 'large' }
        )

        fetchPostsData()

      } catch (error) {
        console.log('Threw an error during getting posts!');
      }
    })()
  }, [])

  return (
    <div className="App">
      <div id='signInDiv'></div>

      { Object.keys(user).length !== 0 && 
      <>
        <button className='signOutButton' onClick={(e) => handleClickSignOut(e)}>Sign Out</button>

        <div className='posts'>
        <h3 className='title'>All posts <MdOutlineLocalPostOffice /></h3>
        {totalPostInfo.map((post, index) => {
          return (
            <Post 
              key={index}
              {...post}
            />
          )
        })}
        </div>
      </>
      }
    </div>
  );
}

export default App;

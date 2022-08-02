import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import "./Comments.css";
import CommentForm from "../../components/CommentForm";


const { checkAuth } = require("../../utils/checkAuth");

const Comments = () => {
  const [backendComments, setBackendComments] = useState([]);
  const rootComment = backendComments.filter(
    (backendComment) => {return backendComment.parentId === null}
  );
  const getReplies = commendId => {
    return backendComments.filter( (backendComment) => backendComment.parentId === commendId ).sort((a,b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime())
  }


  
  const [numberInfo, setNumberInfo] = useState({});
  const [user, setUser] = useState({})
  let params = useParams();

  const getComments = async () => {
    await fetch("/api/telldata/comments/" + params.number, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {return res.json();})
      .then((data) => {setBackendComments(data);});
  };

  const getNumberInfo = async () => {
    await fetch("/api/telldata/getOne?number=" + params.number)
      .then((res) => {return res.json();})
      .then((data) => {setNumberInfo(data[0]);});
  };

  const addComment = async (text, parentId) => {
      
      let data = {
        nickname: user.email,
        telldata_id: numberInfo.id,
        comment: text,
        parentId: parentId
      }
      await fetch("/api/telldata/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => {return res.json();})
      .then((data) => {if (data.inserted) {getComments()}})
    }
 
  useEffect(() => {
    checkAuth(localStorage.getItem('token')).then((res) => {setUser(res)})
    getComments();
    getNumberInfo();
    
    
  }, []);
 
  return (
    
      <div className="comments">
      <h1>Commenti per {params.number}</h1>

      <h3>{numberInfo.comment}</h3>
      <div className="comments">
        <h3 className="comments-title">Comments:</h3>
        <div className="comment-form-title"> Write comment </div>
        <CommentForm submitLabel="Write" handleSubmit={addComment}/>
        <div className="comments-title">
          <div className="comments-container">
            {rootComment.map((data, key) => (
              <Comment data={data} key={data.id} replies={getReplies(data.id)} user={user}/>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Comments;

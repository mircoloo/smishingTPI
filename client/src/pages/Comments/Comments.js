import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import "./Comments.css";
import jwt from "jwt-decode";
import CommentForm from "../../components/CommentForm";

const Comments = () => {
  const [backendComments, setBackendComments] = useState([]);
  const rootComment = backendComments.filter(
    (backendComment) => {return backendComment.parentId === null}
  );
  const getReplies = commendId => {
    return backendComments.filter( (backendComment) => backendComment.parentId === commendId ).sort((a,b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime())
  }

  
  const [numberInfo, setNumberInfo] = useState({});
  //  const [user, setUser] = useState({})
  let params = useParams();
  let nickname;

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

    const token = localStorage.token;
    //Get user informations
    if (token) {
      const u = jwt(token);
      if (!u) {
        localStorage.removeItem("token");
        window.location.href("/login");
      } else {
        await fetch("/api/users/" + u.id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "Bearer " + token,
          },
        })
          .then((res) => {return res.json();})
          .then((data) => {
            console.log(data[0]);
            nickname = data[0].email;
          });
      } 

      let data = {
        nickname: nickname,
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

    
  };

  useEffect(() => {
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
              <Comment data={data} key={data.id} replies={getReplies(data.id)}/>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Comments;

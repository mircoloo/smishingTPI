import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import jwt from "jwt-decode";

const Comments = () => {
  const [comments, setComments] = useState([]);
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
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments(data);
      });
  };

  const getNumberInfo = async () => {
    await fetch("/api/telldata/getOne?number=" + params.number)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data[0] !== undefined) {
          setNumberInfo(data[0]);
        }
      });
  };

  const addComment = async () => {
    const comment = document.querySelector("#comment-input-field");

    //const allComments = document.querySelector('.comments')
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
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            //setUser(res[0])
            nickname = data[0].email;
          });
      }
    }

    await fetch("/api/telldata/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
        telldata_id: numberInfo.id,
        comment: comment.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.inserted) {
          /* alert("Commento inserito correttamente"); */ getComments();
        } else {
          comment.style.backgroundColor = "red";
          console.log(data);
        }
      });
  };

  useEffect(() => {
    getComments();
    getNumberInfo();
  }, []);

  return (
    <>
      <h1>Commenti per {params.number}</h1>

      {/* {numberInfo ? <h3>{numberInfo.comment}</h3> : <h3>Loading comment</h3>} */}
      <h3>{numberInfo.comment}</h3>
      <div className="comments">
        {comments.map((data, key) => (
          <Comment data={data} key={data.id} />
        ))}
      </div>

      <div className="add-comment-div">
        <button onClick={addComment}>Add a comment</button>
        <input id="comment-input-field" type="text"></input>
      </div>
    </>
  );
};

export default Comments;

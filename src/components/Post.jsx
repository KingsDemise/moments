"use client";
import { ArrowUpIcon, ChatIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import Moment from "react-moment";
export default function Post({ img, userImg, caption, username, id }) {
  const commentInputRef = useRef(null);
  const handleChatIconClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  async function sendComment(event) {
    event.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  }
  const { data: session } = useSession();
  useEffect(() => {
    const fetchComments = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);
  return (
    <div className="bg-white my-7 border rounded-md">
      <div className="flex items-center p-5">
        <img
          className="h-16 w-16 rounded-full  object-cover border p-1 mr-3"
          src={userImg}
          alt={username}
        />
        <p className="flex-1 text-black">{username}</p>
      </div>
      <img className="object-cover border p-4 w-full " src={img} alt="" />
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <ArrowUpIcon className="btn text-black" />
            <ChatIcon className="btn text-black" />
          </div>
        </div>
      )}
      <p className="p-5 truncate text-black">
        <span className="font-bold mr-2 ">{caption}</span>
      </p>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 mb-2 text-black"
            >
              <img
                className="h-7  rounded-full object-cover"
                src={comment.data().userImage}
                alt="user-image"
              />
              <p className="font-semibold text-black">
                {comment.data().username}
              </p>
              <p className="flex-1 truncate text-black">
                {comment.data().comment}
              </p>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}
      {session && (
        <form className="flex items-center p-4">
          <img className="h-8 w-8 rounded-full" src={userImg} alt={username} />
          <input
            value={comment}
            ref={commentInputRef}
            onChange={(event) => setComment(event.target.value)}
            className=" border-none flex-1 focus:ring-0 text-black"
            type="text"
            placeholder="Share your thoughts..."
          />
          <button
            type="submit"
            onClick={sendComment}
            disabled={!comment.trim()}
            className="text-blue-400 font-bold disabled:text-blue-200"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}

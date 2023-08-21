"use client";
import { ArrowUpIcon, ChatIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
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
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const { data: session } = useSession();
  console.log(session);
  async function sendComment(event) {
    event.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  }
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
  useEffect(() => {
    const fetchLikes = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);
  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  }
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
            {hasLiked ? (
              <ArrowUpIcon onClick={likePost} className="text-red-400 btn" />
            ) : (
              <ArrowUpIcon onClick={likePost} className="btn text-black" />
            )}
            <ChatIcon className="btn text-black" />
          </div>
        </div>
      )}
      <p className="p-5 truncate text-black">
        {likes.length > 0 &&
          (likes.length == 1 ? (
            <p className="font-bold mb-1 text-black">{likes.length} Upvote</p>
          ) : (
            <p className="font-bold mb-1 text-black">{likes.length} Upvotes</p>
          ))}
        <span className="font-bold mr-2 ">{caption}</span>
      </p>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map((comment) => (
            <div
              key={comment.data().id}
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

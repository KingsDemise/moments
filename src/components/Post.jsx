"use client";
import {
  ArrowUpIcon,
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import React, { useRef, useState } from "react";

export default function Post({ img, userImg, caption, username, id }) {
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);
  const handleChatIconClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };
  return (
    <div className="bg-white my-7 border rounded-md">
      <div className="flex items-center p-5">
        <img
          className="h-16 w-16 rounded-full  object-cover border p-1 mr-3"
          src={userImg}
          alt={username}
        />
        <p className="flex-1 text-black">{username}</p>
        <DotsHorizontalIcon className="text-black h-5 " />
      </div>
      <img className="object-cover border p-4 w-full " src={img} alt="" />
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <ArrowUpIcon
            // onClick={likePost}
            className="text-black btn"
          />
          <ChatIcon className="btn text-black " onClick={handleChatIconClick} />
        </div>
      </div>
      <p className="p-5 truncate text-black">
        <span className="font-bold mr-2 ">{caption}</span>
      </p>
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
          // onClick={sendComment}
          // disabled={!comment.trim()}
          className="text-blue-400 font-bold disabled:text-blue-200"
        >
          Send
        </button>
      </form>
    </div>
  );
}

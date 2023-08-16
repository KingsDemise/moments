import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import React from "react";

export default function Post({ img, userImg, caption, username, id }) {
  return (
    <div className="bg-white my-7 border rounded-md">
      <div className="flex items-center p-5">
        <img
          className="h-16 w-16 rounded-full  object-cover border p-1 mr-3"
          src={userImg}
          alt={username}
        />
        <p className="flex-1 text-black">{username}</p>
        <DotsHorizontalIcon className="text-black h-5" />
      </div>
      <img className="object-cover w-full" src={img} alt="" />
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon
            // onClick={likePost}
            className="text-black btn"
          />
          <ChatIcon className="btn text-black" />
        </div>
        <BookmarkIcon className="btn text-black" />
      </div>
    </div>
  );
}

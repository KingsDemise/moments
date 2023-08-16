import React from "react";
import Post from "./Post";
export default function Posts() {
  const posts = [
    {
      id: "1",
      username: "notkingshuk",
      userImg:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      caption: "Hello everynyan",
    },
    {
      id: "2",
      username: "notkingshuk",
      userImg:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      caption: "Hello everynyan",
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

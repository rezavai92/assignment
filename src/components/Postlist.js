import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "baseui/spinner";

import { Pagination } from "baseui/pagination";




import PostCard from "./PostCard";
export default function Postlist() {
  const [page, setPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [isOpen,setIsOpen] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
         
        if (totalpages === 1) {
          const allPosts = await axios.get(
            "https://609925a599011f001714034f.mockapi.io/api/v1/Posts"
          );

          console.log(allPosts);
          setTotalPages(Math.ceil(allPosts.data.length / 10));
        }

        const response = await axios.get(
          `https://609925a599011f001714034f.mockapi.io/api/v1/Posts?page=${page}&limit=10`
        );
        setPosts(response.data);
        setIsOpen(false)
        console.log(response);
      } catch (error) {}
    }

    fetchData();
  }, [page]);
  return (
    <>

 {isOpen ? <Spinner   overrides={{
        Svg: {
          style: ({ $theme }) => ({
            outline: `${$theme.colors.warning200} solid`,
            backgroundColor: $theme.colors.warning200,
            position :"absolute",
            top : "50%",
            left :"50%",
            transform: "translate(-50,0)" ,
          })
        }
      }} />  : null}
      {posts.length > 0 ? (
        <div>
          <Pagination
            
            numPages={totalpages}
            currentPage={page}
            onPageChange={({ nextPage }) => {
              setPage(nextPage);
            }}

            overrides={{
                Root: {
                  style: ({ $theme }) => ({
                    outline: `${$theme.colors.warning200} solid`,
                    backgroundColor: $theme.colors.warning200,
                    margin : "1% 5%"
                  })
                }
              }}
          />
          {posts.map((post) => {
            return (
              <PostCard
                title={post.postTitle}
                content={post.postContent}
                id={post.id}
                author={post.authorName}
                createdAt={post.createdAt}
              />
            );
          })}
        </div>
      ) : null }
    </>
  );
}

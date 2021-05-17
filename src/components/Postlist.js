import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "baseui/spinner";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Pagination, SIZE } from "baseui/pagination";

import PostCard from "./PostCard";
export default function Postlist() {
  const [page, setPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const[searching,setSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(true);
  let [initialRender, setInitialRender] = useState(true);

  useEffect(() => {

    // async function to populate post list with backend data
    async function fetchData() {
      try {
        if (initialRender) {
          const allPosts = await axios.get(
            "https://609925a599011f001714034f.mockapi.io/api/v1/Posts"
          );

          console.log(allPosts);
          setTotalPages(Math.max(1, Math.ceil(allPosts.data.length / 10)));
        }

        if(searchTerms==""){

            console.log("search term is empty")
            const response = await axios.get(
                `https://609925a599011f001714034f.mockapi.io/api/v1/Posts?page=${page}&limit=10`
              );
              setPosts(response.data);

        }
        else {

            console.log("search term is not empty")
            const response = await axios.get(
                `https://609925a599011f001714034f.mockapi.io/api/v1/Posts?page=${page}&limit=10&search=${searchTerms.trim()}`
              );

              setPosts(response.data);
        }


        setIsOpen(false);
    
      } catch (error) {
        setIsOpen(false);
      }
    }
    // calling the fetch function 
    fetchData();
    return () => {
      setInitialRender(false);
    };
  }, [page,searching]);

  // search handler
 console.log("current page, totalposts, postlist",page,totalpages,posts)
  function searchHandler() {
    async function search() {
      try {
        const response = await axios.get(
          `https://609925a599011f001714034f.mockapi.io/api/v1/Posts?page=1&search=${searchTerms.trim()}`
        );
      console.log("search result", response);
    
        setPage(1)
        setSearching(!searching)
        setTotalPages(Math.max(1, Math.ceil(response.data.length / 10)));
      } catch (error) {}
    }
    search();
  }
  return (
    <>
     {/* spinner loads till post list fully rendered  */ }
      {isOpen ? (
        <Spinner
          overrides={{
            Svg: {
              style: ({ $theme }) => ({
                outline: `${$theme.colors.warning200} solid`,
                backgroundColor: $theme.colors.warning200,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50,0)",
              }),
            },
          }}
        />
      ) : null}

     {/* search bar */}
      <div
        style={{ display: "flex", boxSizing: "border-box", margin: "1% 4%" }}
      >
        <Input
          value={searchTerms}
          onChange={(e) => {
            setSearchTerms(e.target.value);
          }}
          placeholder="Search Here"
          clearOnEscape
        />
        <Button onClick={searchHandler}>Search</Button>
      </div>

      {/*checks if posts is empyt or not 
        -if-
         posts is empty then shows nothing
        else-
        show the list
      */}
      {posts.length > 0 ? (
        <div>
            {/*pagination starts */}
          <Pagination
            size={SIZE.mini}
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
                  boxSizing: "border-box",
                  margin: "1% 7%",
                }),
              },
            }}
          />
          {/*pagination ends */}

          {/*list of posts */}
          <div style={{display:"grid" , gridTemplateColumns:"repeat(3,1fr)"}} >                      
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
        </div>
      ) : null}
      {/* checks if spinner is not loading and the length of posts is zero
        it indicates that, search keyword is used and there is no data
        // so, we will show the "empty list" in a paragraph
      */}
      {!isOpen && posts.length === 0 ? (
        <p style={{ textAlign: "center" }}>empty list</p>
      ) : null}
    </>
  );
}

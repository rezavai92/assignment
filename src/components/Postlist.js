import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "baseui/spinner";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {Button} from 'baseui/button'
import { Pagination,SIZE } from "baseui/pagination";




import PostCard from "./PostCard";
export default function Postlist() {
  const [page, setPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const[searchTerms,setSearchTerms] = useState("");
  const [isOpen,setIsOpen] = useState(true)
  let [initialRender,setInitialRender] = useState(true)

  

  useEffect(() => {
    async function fetchData() {
      try {
         
        if (initialRender) {
          const allPosts = await axios.get(
            "https://609925a599011f001714034f.mockapi.io/api/v1/Posts"
          );

          console.log(allPosts);
          setTotalPages(Math.max(1,Math.ceil(allPosts.data.length / 10)));
        }

        const response = await axios.get(
          `https://609925a599011f001714034f.mockapi.io/api/v1/Posts?page=${page}&limit=10`
        );
        setPosts(response.data);
        setIsOpen(false)
        console.log(response);

      } catch (error) {
          setIsOpen(false)
      }
    }

    fetchData();
    return ()=>{
        setInitialRender(false)
    }
  }, [page]);

  // search handler

  function searchHandler (){

    async function search(){
        try{

            const response =await axios.get(`https://609925a599011f001714034f.mockapi.io/api/v1/Posts?page=1&search=${searchTerms}`)
            console.log("search result",response)
            setPosts(response.data)
            setPage(1)
            setTotalPages(Math.max(1,Math.ceil(response.data.length / 10)));
            
        }
        catch(error){


        }



    }
    search()
  }
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


<div style={{display :"flex" , boxSizing :"border-box", margin :"1% 4%" }} >
            <Input
      value={searchTerms}
      onChange={(e)=>{setSearchTerms(e.target.value)}}
      placeholder="Search Here"
      clearOnEscape
    />
    <Button onClick={searchHandler} >Search</Button>
            </div>
      {posts.length > 0 ? (
        <div >
           

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
                    boxSizing :"border-box",
                    margin :"1% 5%",
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

      {!isOpen && posts.length===0 ? <p style={{textAlign:"center"}} >empty list</p>  :null}
    </>
  );
}

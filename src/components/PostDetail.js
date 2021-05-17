import React , {useState,useEffect} from 'react'
import axios from 'axios'
import { Spinner } from "baseui/spinner";

export function formatDateTime (datetime){

  const date=  new Date(datetime).toString().split(" ").filter((d, index) => {
                              return index < 4;
                            }).join(",");
const time = new Date(datetime).getUTCHours()+":"+new Date().getUTCMinutes()

return {date,time}
}

export default function PostDetail() {

    const [post,setPost] = useState({})
    const [errorMessage,setErrorMessage] = useState("")
    const [isOpen,setIsOpen] = useState(true)
    const postId = window.location.pathname.split("/")[2]

    useEffect(()=>{
        
        async function fetchData (){

            try{

              const response =  await axios.get(`https://609925a599011f001714034f.mockapi.io/api/v1/Posts/${postId}`)
                console.log(response.data)
              setPost(response.data)
              setIsOpen(false)
              if(errorMessage!=""){
                  setErrorMessage("")
              }

            }
            catch(error){
                    console.log(error)
                    setIsOpen(false)
                    setErrorMessage("invalid")
            }

        }

        fetchData()

    },[])
    return (
        <div style={{margin :"1% 5%"}} >

            {isOpen ? <Spinner   overrides={{
        Svg: {
          style: ({ $theme }) => ({
            outline: `${$theme.colors.warning200} solid`,
            backgroundColor: $theme.colors.warning200,
            position :"absolute",
            top : "50%",
            left :"50%",
            transform: "translate(-50,0)",
          })
        }
      }} />  : null}
           {post.id? <>
            <h1>{post.postTitle}</h1>
             <p>{post.authorName}</p>
            <p> {formatDateTime(post.createdAt).date+"-"+formatDateTime(post.createdAt).time}</p>

            <p>
                {post.postContent}
            </p>
            </> : null}
            {errorMessage!=""? <h1> {errorMessage}</h1> : null}
        </div>  
    )
}

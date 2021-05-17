import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "baseui/spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp,faHeart,faLaugh, faSadCry } from '@fortawesome/free-solid-svg-icons'
import { faFacebook,faTwitter,faLinkedin,faWhatsapp } from '@fortawesome/free-brands-svg-icons'
// formatting date time in an understandable form
export function formatDateTime(datetime) {
  const date = new Date(datetime)
    .toString()
    .split(" ")
    .filter((d, index) => {
      return index < 4;
    })
    .join(",");
  const time =
    new Date(datetime).getUTCHours() + ":" + new Date().getUTCMinutes();

  return { date, time };
}
// component starts
export default function PostDetail() {
  const [post, setPost] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const postId = window.location.pathname.split("/")[2];

  useEffect(() => {

    // it fetches data asynchronously from backend
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://609925a599011f001714034f.mockapi.io/api/v1/Posts/${postId}`
        );
        console.log(response.data);
        setPost(response.data);
        setIsOpen(false);
        if (errorMessage != "") {
          setErrorMessage("");
        }
      } catch (error) {
        console.log(error);
        setIsOpen(false);
        setErrorMessage("invalid");
      }
    }

    fetchData();
  }, []);
  return (
    <div style={{ margin: "1% 5%" }}>
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
      {post.id ? (
        <>
          <h1>{post.postTitle}</h1>
          
          <p>{  post.authorName+" . "+formatDateTime(post.createdAt).date +
              "-" +
              formatDateTime(post.createdAt).time}</p>


          <p>{post.postContent}</p>

          <p>
              <FontAwesomeIcon icon={faThumbsUp } color="blue" /> 25 likes {" "}
              <FontAwesomeIcon icon={faHeart} color="red" /> 50 Hearts {" "}
              <FontAwesomeIcon icon={faLaugh} color="yellow" /> 1 Haha {" "}
              <FontAwesomeIcon icon ={faSadCry} color="brown" />  4 Sads {" "}
          </p>
          <h2>
                <span style={{fontWeight:"normal"}} >Share</span> {" "}
              <FontAwesomeIcon icon={faLinkedin} color="black" /> {" "}
              <FontAwesomeIcon icon={faFacebook}  color="blue" /> {" "}
              <FontAwesomeIcon icon={faWhatsapp}  color="green" /> {" "}
              <FontAwesomeIcon icon={faTwitter} color="#0eb2ed" />

          </h2>
        </>
      ) : null}
      {errorMessage != "" ? <h1> {errorMessage}</h1> : null}
    </div>
  );
}

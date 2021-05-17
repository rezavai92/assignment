import React, { useState } from "react";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { Link, Redirect } from "react-router-dom";
import { formatDateTime } from "./PostDetail";
export default function PostCard({ content, id, title, author, createdAt }) {
  //const [redirect,setRedirect] = useState(false)
  return (
    <>
      <Card
        title={title}
        overrides={{
          Body: {
            style: ({ $theme }) => ({
              outline: `${$theme.colors.warning200} solid`,
            }),
          },
          Contents: {
            style: ({ $theme }) => ({
              outline: `${$theme.colors.warning200} solid`,
              backgroundColor: $theme.colors.warning200,
            }),
          },
        }}
      >
        <StyledBody>
          <p>{id}</p>
          <p>
            {author +
              " . " +
              formatDateTime(createdAt).date +
              " " +
              formatDateTime(createdAt).time}{" "}
          </p>

          <p style={{ height: "50px", overflow: "hidden" }}>{content}</p>
        </StyledBody>
        <StyledAction>
          <div style={{
              width: "100%",
              textAlign :"center",
              backgroundColor: "black",
              padding :"15px",
              
              boxSizing :"border-box"
            }} >
                        <Link
                        style={{color :"white",textDecoration:"none"}}
            to={`/posts/${id}`}
            
          >
            Read More
          </Link>

          </div>

        </StyledAction>
      </Card>
    </>
  );
}

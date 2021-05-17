import React from 'react'
import {
    Card,
    StyledBody,
    StyledAction
  } from "baseui/card";
  import { Button } from "baseui/button";
  import {Link} from "react-router-dom"
export default function PostCard({content,id,title}) {
    return (
        <Card 
        title={title}
         overrides={{

            Body: {
                style: ({ $theme }) => ({
                  outline: `${$theme.colors.warning200} solid`,
                 
                  
                  
                })
              },
              Contents: {
                style: ({ $theme }) => ({
                  outline: `${$theme.colors.warning200} solid`,
                  backgroundColor: $theme.colors.warning200,
                                    
                  
                })
              }
         }}
        > 
        <StyledBody   >
          
           <p style={{maxHeight :"100px",overflow :"hidden"}} >{content}</p>
        </StyledBody>
        <StyledAction>
          <div
            


          >
            <Link to={`/posts/${id}`}  >
            Read More
            </Link>
           
          </div>
        </StyledAction>
      </Card>
    )
}

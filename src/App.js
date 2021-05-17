import React from   'react'
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import PostDetail from './components/PostDetail'
import {LightTheme, BaseProvider, styled} from 'baseui';
import Postlist from './components/Postlist'
import Home from './components/Home'
import NotFound from './components/NotFound'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {StatefulInput} from 'baseui/input';

const engine = new Styletron()
function BaseUIWrapper ({children}){

  return(<StyletronProvider value={engine} >
     <BaseProvider theme={LightTheme} >{children}</BaseProvider>
  </StyletronProvider>)
}
const App = ()=>{


  return(<div>
     <BaseUIWrapper>
      <Router>
        <Switch>
        <Route path = "/posts/:id" exact component={PostDetail} />
        <Route path="/posts" exact component={Postlist} />
         <Route path="/" exact component={Home} />
        <Route  component ={NotFound} />
        </Switch>
      </Router>
     </BaseUIWrapper>
  </div>)
}

export default App
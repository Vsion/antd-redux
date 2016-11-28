import React from 'react';
import Nav from './Nav';
import { Row, Col , Icon } from 'antd';
import NavToggle from './NavToggle';

 export default class App extends React.Component {
   render(){
     return (
       <div className="">
         <div className="nav">
           <NavToggle/>
           <Nav/>
         </div>
         <div className="content">
         </div>
       </div>
     );
   }
 }

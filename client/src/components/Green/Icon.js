import React from 'react';
import {Button} from 'react-bootstrap';
import Info from "./Info.js"
import '../../css/Green.css';
import categories from "../Budget/budgetCategories.js";


const Icon = ({data, displayFunction}) => {

    // let print = function(){
    //   console.log(data["id"])
    //   console.log()
    //   React.findDOMNode(this)
    //   document.querySelector(".infoContainer").append(
    //     <Info/>
    //   )
    // }


    return(
    <div className = "icon box-shadow">
      <button type="button" className="btn btn-light btn-circle btn-xl" onClick = {displayFunction.bind(this, data)} style = {{backgroundImage: `../../images/${data.subcategory}.png`}} > </button> 
      <p className = "text-center"> {data.subcategory} </p>
    </div>
    )
};

export default Icon;
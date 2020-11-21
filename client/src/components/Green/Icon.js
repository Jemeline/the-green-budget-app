import React from 'react';
import {Button} from 'react-bootstrap';
import Info from "./Info.js"
import '../../css/Green.css';
import categories from "../Budget/budgetCategories.js";
// import  {Transportation, Food, Utilities, Social, Clothing, Medical, 
//   Health, Beauty, Insurance, Personal, Debt, Retirement, Savings, Education, 
//   Giving, Taxes, Investments, Hobbies, Pets, Other} from "./emojis.js"
import images from "./emojis.js"

const Icon = ({data, displayFunction}) => {

    let image = null;
    console.log(String(images))
    String(images["Food"])
      // let image = null;
      for (const [key, value] of Object.entries(images)) {
        //console.log(String(key));
        let subcat = data.subcategory.replace(" ", "");
        let cat = data.category.replace(" ", "");
        if(subcat === String(key)){
          image = value;
        }
        else if(cat === String(key)){
          image = value;
        }
      }
      

    //  images.includes(`${data.subcategory}`)){
    //   //  image = images[`${data.subcategory}`];
    //   console.log("hellly eah it does")
    //  }
      // else {
      //   image = images[`${data.category}`]
      // }

    return(
    <div className = "icon box-shadow has-text-centered">
      <button type="button" className="btn btn-light btn-circle btn-xl" onClick = {displayFunction.bind(this, data)}>  <img className = "iconImage" src={image} /> </button> 
      <p className = "has-text-centered iconText"> {data.subcategory} <br/> ${data.amount}</p>

     
    </div>
    )
    }

export default Icon;
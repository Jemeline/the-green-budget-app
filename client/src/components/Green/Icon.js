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

    // function importAll(r) {
    //   let images = {};
    //   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    //   return images;
    // }
    // const images = importAll(require.context('./emojis', false, /\.(png)$/));

    console.log(images)

    return(
    <div className = "icon box-shadow">
      <button type="button" className="btn btn-light btn-circle btn-xl" onClick = {displayFunction.bind(this, data)}>  <img className = "iconImage" src={images[`${data.category}`]} /> </button> 
      <p className = "text-center iconText"> {data.subcategory} </p>
      <p className = "text-center iconText"> {data.amount} </p>

     
    </div>
    )
    }

export default Icon;
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

    //console.log(images)
      // let image = null;
      // if (images.includes(`${data.subcategory}`)){
      //   image = images[`${data.subcategory}`];
      // }
      // else {
      //   image = images[`${data.category}`]
      // }

    return(
    <div className = "icon box-shadow has-text-centered">
      <button type="button" className="btn btn-light btn-circle btn-xl" onClick = {displayFunction.bind(this, data)}>  <img className = "iconImage" src={images[`${data.category}`]} /> </button> 
      <p className = "has-text-centered iconText"> {data.subcategory} <br/>{data.amount}</p>

     
    </div>
    )
    }

export default Icon;
import React from 'react'
import '../../css/Widget.css';


const Widget = (props) => {
    return (
        <div className={'Container'+props.direction}>
            <h3 className={'Text'}>{props.text}</h3>
        </div>
    )
}

export default Widget;
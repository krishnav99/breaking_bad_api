import React from 'react'
import {Link} from 'react-router-dom'

function Card(props){
    return(
        <div className="card">
            <img src={props.img}></img>
            <div>
                <p><span>Name:</span> {props.name}</p>
                <p><span>Occupation:</span> {props.occupation.join(", ")}</p>
                <p><span>Date of birth:</span> {props.birthday}</p>
                <p><span>Status:</span> {props.status}</p>
                <button> <Link to={`/character/${props.char_id}`}>Know more</Link></button>
            </div>
           
        </div>
    )
}

export default Card;
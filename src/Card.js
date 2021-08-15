import React from 'react'
import {Link} from 'react-router-dom'

function Card(props){
    return(
        <div className="card">
            <p>Name: {props.name}</p>
            <p>Occupation: {props.occupation.join(", ")}</p>
            <p>Date of birth: {props.birthday}</p>
            <p>Status: {props.status}</p>
            <Link to={`/character/${props.char_id}`}><button>Know more</button></Link>
        </div>
    )
}

export default Card;
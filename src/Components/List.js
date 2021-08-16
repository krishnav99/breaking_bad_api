import React, { useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios"
import Card from "./Card"

const BASE_URL = "https://www.breakingbadapi.com/api/";


function List(props){
    const [keyword, setKeyword] = useState("");
    const [charactersData, setCharactersData] = useState([])
 
    useEffect(() => {
        async function getData(){
            try{
                const res = await axios.get(BASE_URL+"characters");
                if(res.status !==200) throw new Error("Error!! Status code:",res.status)
                setCharactersData(res.data)
            }   
            catch(err){
                console.log(err)
            }
        }
        getData()
    },[])

    //Filtering data by keywords
    let data =  charactersData.filter(el=>{
        if(keyword === "") return el
        if(el.name.toLowerCase().includes(keyword.toLowerCase())) return el
        return null
    })
    
    let pageNumber = parseInt(props.pageNumber);
    data = data.slice((pageNumber-1)*10,pageNumber*10)
    let cards =   data.map(el=><Card {...el} key={el.char_id}/>)

    return(
        <div className="list">
            <span>🔍 </span><input type="text" value={keyword} onChange={(evt)=>{setKeyword(evt.target.value)}}></input>
            {charactersData.length===0?<h4>Loading....</h4>:cards}
            <div className="pagnation">
                {pageNumber!==1&&<button><Link to={`/${pageNumber-1}`}>Previous</Link></button>}
                <span>{pageNumber}</span>
                {pageNumber<7 && <button><Link to={`/${pageNumber+1}`}>Next</Link></button>}
            </div>
            
        </div>
        
    )
}

export default List;